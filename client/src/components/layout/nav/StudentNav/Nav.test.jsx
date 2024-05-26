// Component
import { Nav } from './Nav';
import { WarningContextProvider } from '../../../../context/WarningContext';
// Dependencies
import { BrowserRouter, redirect } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
// Test Dependencies
import { render, screen } from '@testing-library/react';

jest.mock(
	'../../../../assets/img/default/profile-picture.jpg',
	() => 'profile-picture.jpg',
);

jest.mock(
	'../../../../assets/img/default/projectcover.jpg',
	() => 'projectcover.jpg',
);

const queryClient = new QueryClient();

describe('Student Nav Tests', () => {
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

	test('Should display the Student Navigation', () => {
		expect(screen.getByRole('navigation')).toBeInTheDocument();
	});

	test('Should redirect to the login page if a token is not found in the local storage', () => {
		const token = localStorage.getItem('token');

		if (token === undefined) {
			redirect('/');
			expect(screen.getByText('Inicia Sesion')).toBeInTheDocument();
		}
	});

    test("Should redirect to the 404 page when the role isn't a student", ()=>{
        const role = localStorage.getItem('role');

        if(role ==! 1){
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

	test('Should display the profile page of the student when the profile link is clicked', () => {
		const profileLink = screen.getByRole('link', { name: /Mi Pefil/i });
		expect(profileLink).toBeInTheDocument();
	});
});
