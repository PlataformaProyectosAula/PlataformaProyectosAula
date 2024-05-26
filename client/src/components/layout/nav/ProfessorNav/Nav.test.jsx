// Component
import { Nav } from './Nav';
import { WarningContextProvider } from '../../../../context/WarningContext';
// Dependencies
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
// Test Dependencies
import { render, screen } from '@testing-library/react';

jest.mock(
	'../../../../assets/img/default/icon.png',
	() => 'profile-picture.jpg',
);

const queryClient = new QueryClient();

describe('Professor Nav Tests', () => {
	beforeEach(() => {
		render(
			<WarningContextProvider>
				<QueryClientProvider client={queryClient}>
					<BrowserRouter>
						<Nav />
					</BrowserRouter>
				</QueryClientProvider>
			</WarningContextProvider>,
		);
	});

	test('should render the Professor Navigation', () => {
		expect(screen.getByRole('navigation')).toBeInTheDocument();
	});

	test('Should redirect to the login page if a token is not found in the local storage', () => {
		const token = localStorage.getItem('token');

		if (token === undefined) {
			redirect('/');
			expect(screen.getByText('Inicia Sesion')).toBeInTheDocument();
		}
	});

	test("Should redirect to the 404 page when the role isn't a student", () => {
		const role = localStorage.getItem('role');

		if (role == !2) {
			redirect('*');
			expect(screen.getByText('404')).toBeInTheDocument();
		}
	});

	test('Should display the index link', () => {
		const indexLink = screen.getByRole('link', { name: /Inicio/i });
		expect(indexLink).toBeInTheDocument();
	});

	test('Should display the filter link', () => {
		const filterLink = screen.getByRole('link', { name: /Buscar/i });
		expect(filterLink).toBeInTheDocument();
	});
});
