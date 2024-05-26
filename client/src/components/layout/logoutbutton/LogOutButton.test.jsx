// Componenent
import { LogOutButon } from './LogOutButon';
//Dependencies
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { WarningContextProvider } from '../../../context/WarningContext';
import axios from 'axios';
import nock from 'nock';
// Test dependencies
import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

jest.mock('axios');

describe('LogOut button test', () => {
	const queryClient = new QueryClient();

	beforeEach(() =>
		render(
			<QueryClientProvider client={queryClient}>
				<BrowserRouter>
					<WarningContextProvider>
						<LogOutButon />
					</WarningContextProvider>
				</BrowserRouter>
			</QueryClientProvider>,
		),
	);

	test('Should be in the document component LogOut Button', () => {
		expect(
			screen.getByRole('button', { name: /Cerrar Sesión/i }),
		).toBeInTheDocument();
	});

	test('Should verified that there is a token on the localstorage when the button is clicked', () => {
		const logOutButon = screen.getByRole('button', { name: /Cerrar Sesión/i });
		userEvent.click(logOutButon);
		const token = localStorage.getItem('token');
		expect(token).not.toBe(undefined);
	});

	test('Should not call the mutation if there if no token in the localstorage', async () => {
		const logOutButon = screen.getByRole('button', { name: /Cerrar Sesión/i });
		userEvent.click(logOutButon);

		const token = localStorage.getItem('token');

		if (token === undefined) {
			await waitFor(() => {
				expect(axios.post).not.toHaveBeenCalledWith(expect.anything());
				expect(screen.findByText('Ha ocurrido un error')).toBeInTheDocument();
			});
		}
	});
	test('Should handle response of the request', () => {
		nock('https://d9f0-181-143-211-148.ngrok-free.app')
			.post('/api/logout')
			.reply(204);

		waitFor(async () => {
			await expect(screen.getByText('Inicia Sesion')).toBeInTheDocument();
			const token = localStorage.getItem('token');
			expect(token).toBe(undefined);
            const role = localStorage.getItem('role');
			expect(role).toBe(undefined);
            const userId = localStorage.getItem('userId');
			expect(userId).toBe(undefined);
		});
	});
	test('Should handle bad response of the request if the tooken is invalid', () => {
		nock('https://d9f0-181-143-211-148.ngrok-free.app')
			.post('/api/logout')
			.reply(401);

		waitFor(async () => {
			expect(screen.findByText('Ha ocurrido un error')).toBeInTheDocument();
			const token = localStorage.getItem('token');
			expect(token).not.toBe(undefined);
		});
	});
});
