import { Nav } from './Nav';
import { WarningContextProvider } from '../../../../context/WarningContext';
// Dependencies
import { BrowserRouter, redirect } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from 'react-query';
// Test Dependencies
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const queryClient = new QueryClient();

describe('Admin Nav Tests', () => {
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

    test('Should display the Admin navigation', ()=>{
        expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    test('Should redirect to login if the user does not have a token', ()=>{
        const token = localStorage.getItem('token');

        if(token === undefined){
            redirect('/');
            expect(screen.getByText('Inicia Sesion')).toBeInTheDocument();
        }
    });

    test('Should redirect to 404 if the role of the current user does not have access to the route', ()=>{
        const role = localStorage.getItem('role');

        if(role ==! 1){
            redirect('*');
            expect(screen.getByText('404')).toBeInTheDocument();
        }
    });

    test('Should display the users link and redirect to the right page whent the link is clicked', ()=>{
        const usersLink = screen.getByRole('link', {name: /Usuarios/i});
        expect(usersLink).toBeInTheDocument();
        userEvent.click(usersLink);
        expect(screen.getByText('Usuarios')).toBeInTheDocument();
    });

    test('Should display the report link', ()=>{
        const reportsLink = screen.getByRole('link', {name: /Reportes/i});
        expect(reportsLink).toBeInTheDocument();
        userEvent.click(reportsLink);
        expect(screen.getByText('Reportes')).toBeInTheDocument();
    });

    test('Should display the seach link', ()=>{
        const searchLink = screen.getByRole('link', {name: /Buscar/i});
        expect(searchLink).toBeInTheDocument();
    });
});
