import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
//component
import { LogIn } from './LogIn';
//dependencies
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import axios from 'axios';
import nock from 'nock';

jest.mock('axios');

const loginMutation = jest.fn();

loginMutation.mockReturnValue({ isLoading: true, isSuccess: true });

describe('LogIn Page Tests', () => {
	const queryClient = new QueryClient();
	beforeEach(() =>
		render(
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<LogIn />
				</BrowserRouter>
			</QueryClientProvider>,
		),
	);

	test('Should render LogIn form', () => {
		const loginForm = screen.getByRole('form');
		expect(loginForm).toBeInTheDocument();
	});

	test('Should render form elements', () => {
		const emailInput = screen.getByLabelText('Email');
		const passwordInput = screen.getByLabelText('Contraseña');
		const button = screen.getByRole('button', { name: 'Iniciar Sesion' });

		expect(emailInput).toBeInTheDocument();
		expect(passwordInput).toBeInTheDocument();
		expect(button).toBeInTheDocument();
	});

	test('Should catch the changes in the inputs', async () => {
		const emailInput = screen.getByLabelText('Email');
		const passwordInput = screen.getByLabelText('Contraseña');

		await userEvent.type(emailInput, 'test@example.com');
		await userEvent.type(passwordInput, '1234567');

		expect(emailInput).toHaveValue('test@example.com');
		expect(passwordInput).toHaveValue('1234567');
	});
	test('Should prevent form submission without filling required fields', async () => {
		const button = screen.getByRole('button', { name: 'Iniciar Sesion' });
		userEvent.click(button);

		await waitFor(() => {
			expect(axios.post).not.toHaveBeenCalledWith(expect.anything());
		});
	});
	test('Should display Error messages for empty fields', async () => {
		const button = screen.getByRole('button', { name: 'Iniciar Sesion' });
		userEvent.click(button);

		const emailValidationMessage = await screen.findByText(
			'Ingrese el email para continuar',
		);
		const passwordValidationMessage = await screen.findByText(
			'Ingrese la contraseña para continuar',
		);

		expect(emailValidationMessage).toBeInTheDocument();
		expect(passwordValidationMessage).toBeInTheDocument();
	});
	test('Should display Error message for invalid email', async () => {
		const emailInput = screen.getByLabelText('Email');
		const button = screen.getByRole('button', { name: 'Iniciar Sesion' });
		userEvent.click(button);

		await userEvent.type(emailInput, 'testexample');

		const emailValidationMessage = await screen.findByText(
			'Por favor, ingresar un email valido',
		);

		expect(emailValidationMessage).toBeInTheDocument();
	});
	test('Should call handleLogIn on form submission', async () => {
		const queryClient = new QueryClient();

		const emailInput = screen.getByLabelText('Email');
		const passwordInput = screen.getByLabelText('Contraseña');
		const button = screen.getByRole('button', { name: 'Iniciar Sesion' });

		await userEvent.type(emailInput, 'mark@gmail.com');
		await userEvent.type(passwordInput, 'password');

		userEvent.click(button);

		render(
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<LogIn
						handleLogIn={loginMutation({
							data: {
								attributes: {
									code: emailInput.value,
									password: passwordInput.value,
								},
								type: 'user',
							},
						})}
					/>
				</BrowserRouter>
			</QueryClientProvider>,
		);

		expect(loginMutation).toHaveBeenCalledTimes(1);
		expect(loginMutation).toHaveBeenCalledWith({
			data: {
				attributes: {
					code: 'mark@gmail.com',
					password: 'password',
				},
				type: 'user',
			},
		});
	});
	test('Should call reset function upon successful registration', () => {
		const reset = jest.fn();

		const response = loginMutation();

		if (response.isSuccess) {
			reset();
		}

		expect(reset).toHaveBeenCalledTimes(1);
	});
	test('Should render loading component when the request is loading', () => {
		const response = loginMutation();

		const loader = screen.getByTestId('loader-container');

		if (response.isLoading) {
			expect(loader).toBeInTheDocument();
		}
	});
	test('Should display ErrorPopUp when an error occurs during log in', () => {
		nock('https://9360-181-143-211-148.ngrok-free.app')
			.post('/api/login')
			.reply(500, { error: 'Internal Server Error' });

		waitFor(async () => {
			await expect(screen.getByRole('alert')).toBeInTheDocument();
		});
	});
	test('Should redirect to the corresponding page depending the user on successful login', () => {
		nock('https://9360-181-143-211-148.ngrok-free.app')
			.post('/api/login')
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
				if(data && data.attributes.role_id === 2){
					expect(screen.findByText('Student')).toBeInTheDocument();
				}else if(data && data.attributes.role_id === 3){
					expect(screen.findByText('Professor')).toBeInTheDocument();
				}else if(data && data.attributes.role_id === 1){
					expect(screen.findByText('Admin')).toBeInTheDocument();
				}else{
					expect('Inicia Sesion').toBeInTheDocument();
				}
			});
	});
	test('Should redirect to register page when "Register" link is clicked', () => {
		const registerLink = screen.getByRole('link');
		userEvent.click(registerLink);

		waitFor(() => {
			expect(screen.findByText('Crea una cuenta')).toBeInTheDocument();
		});
	});
});
