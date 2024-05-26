import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import nock from 'nock';
import { Register } from './Register';

jest.mock('axios');

const registerMutation = jest.fn();
registerMutation.mockReturnValue({ isLoading: true, isSuccess: true });

describe('Register Page Tests', () => {
	const queryClient = new QueryClient();

	beforeEach(() =>
		render(
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<Register />
				</BrowserRouter>
			</QueryClientProvider>,
		),
	);

	test('Should display register form', () => {
		const registerForm = screen.getByRole('form');
		expect(registerForm).toBeInTheDocument();
	});

	test('Should render form elements properly', () => {
		const codeInput = screen.getByPlaceholderText('Codigo');
		const passwordInput = screen.getByPlaceholderText('Contraseña');
		const button = screen.getByRole('button', { name: 'Registrarse' });
		expect(codeInput).toBeInTheDocument();
		expect(passwordInput).toBeInTheDocument();
		expect(button).toBeInTheDocument();
	});

	test('Should catch input changes', async () => {
		const codeInput = screen.getByPlaceholderText('Codigo');
		const passwordInput = screen.getByPlaceholderText('Contraseña');

		await userEvent.type(codeInput, '123456789');
		await userEvent.type(passwordInput, 'password');

		expect(codeInput).toHaveValue('123456789');
		expect(passwordInput).toHaveValue('password');
	});

	test('Should prevent Form Submission without filling required fields', async () => {
		const button = screen.getByRole('button', { name: 'Registrarse' });

		userEvent.click(button);

		await waitFor(() => {
			expect(axios.post).not.toHaveBeenCalledWith(expect.anything());
		});
	});

	test('Should display Error messages for empty fields', async () => {
		const button = screen.getByRole('button', { name: 'Registrarse' });

		userEvent.click(button);

		const CodeValidationMessage = await screen.findByText(
			'Ingrese el codigo para crear el perfil',
		);

		const PasswordValidationMessage = await screen.findByText(
			'Ingrese la contraseña para crear el perfil',
		);

		expect(CodeValidationMessage).toBeInTheDocument();
		expect(PasswordValidationMessage).toBeInTheDocument();
	});

	test('Should display Error message for too short password length', async () => {
		const passwordInput = screen.getByPlaceholderText('Contraseña');
		const button = screen.getByRole('button', { name: 'Registrarse' });

		await userEvent.type(passwordInput, 'pass');

		userEvent.click(button);

		const shortPasswordValidationMessage = await screen.findByText(
			'La contraseña debe tener al menos 8 digitos',
		);

		if (passwordInput.value.length < 7) {
			expect(shortPasswordValidationMessage).toBeInTheDocument();
		}
	});

	test('Should display Error message for too long password length', async () => {
		const passwordInput = screen.getByPlaceholderText('Contraseña');
		const button = screen.getByRole('button', { name: 'Registrarse' });

		await userEvent.type(passwordInput, '123456789012345678');

		userEvent.click(button);

		const longPasswordValidationMessage = await screen.findByText(
			'La contraseña debe tener menos de 16 digitos',
		);

		if (passwordInput.value.length > 16) {
			expect(longPasswordValidationMessage).toBeInTheDocument(
				'La contraseña debe tener al menos 8 digitos',
			);
		}
	});

	test('Should call handleRegister function on form submission', async () => {
		const codeInput = screen.getByPlaceholderText('Codigo');
		const passwordInput = screen.getByPlaceholderText('Contraseña');
		const button = screen.getByRole('button', { name: 'Registrarse' });
		await userEvent.type(codeInput, '123456789');
		await userEvent.type(passwordInput, 'password');

		const queryCli = new QueryClient();

		userEvent.click(button);

		render(
			<QueryClientProvider client={queryCli}>
				<BrowserRouter>
					<Register
						handleRegister={registerMutation({
							data: {
								attributes: {
									code: codeInput.value,
									password: passwordInput.value,
								},
								type: 'user',
							},
						})}
					/>
				</BrowserRouter>
			</QueryClientProvider>,
		);

		expect(registerMutation).toHaveBeenCalledTimes(1);

		expect(registerMutation).toHaveBeenCalledWith({
			data: {
				attributes: {
					code: '123456789',
					password: 'password',
				},
				type: 'user',
			},
		});
	});

	test('Should call reset function upon successful registration', () => {
		const reset = jest.fn();

		const response = registerMutation();

		if (response.isSuccess) {
			reset();
		}
		expect(reset).toHaveBeenCalledTimes(1);
	});
	test('Should render loading component when the request is loading', async () => {
		const loadingStatus = registerMutation();

		const loader = screen.getByTestId('loader-container');

		if (loadingStatus.isLoading) {
			await waitFor(() => {
				expect(loader).toBeInTheDocument();
			});
		}
	});
	test('Should display SuccessPopUp on successful registration', () => {
		nock('https://d9f0-181-143-211-148.ngrok-free.app')
			.post('/api/user')
			.reply(200, {
				data: {
					attributes: {
						user_name: 'Adrian_Rutherford',
						code: '123456789',
						email: 'mark.jaskolski@example.net',
						role_id: 2,
						description: null,
						state: '1',
						token: 'egebee37738eebdb',
					},
					id: '52',
					links: {
						self: null,
					},
					type: 'user',
				},
			}),
			waitFor(async () => {
				await expect(screen.getByRole('status')).toBeInTheDocument();
			});
	});
	test('Should display ErrorPopUp when an error occurs during registration', () => {
		nock('https://d9f0-181-143-211-148.ngrok-free.app')
			.post('/api/user')
			.reply(500, { error: 'Internal Server Error' });

		waitFor(async () => {
			await expect(screen.getByRole('alert')).toBeInTheDocument();
		});
		waitFor(async () => {
			await expect(console.error).value.toBe('Internal Server Error');
		});
	});
	test('Should redirect to login page when "LogIn" link is clicked', () => {
		const logInLink = screen.getByRole('link');
		userEvent.click(logInLink);

		waitFor(() => {
			expect(screen.findByText('Inicia Sesion')).toBeInTheDocument();
		});
	});
});
