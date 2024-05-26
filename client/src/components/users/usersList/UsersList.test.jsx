import { render, screen } from '@testing-library/react';
//component
import { UsersList } from './UsersList';
import { WarningContextProvider } from '../../../context/WarningContext';
//dependencies
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

jest.mock('axios');

const fetchUsers = jest.fn();

fetchUsers.mockReturnValue({ isLoading: true, isSuccess: true });

describe('Users list tests', () => {
	const queryClient = new QueryClient();
	beforeEach(() => {
		render(
			<WarningContextProvider>
				<BrowserRouter>
					<QueryClientProvider client={queryClient}>
						<UsersList />
					</QueryClientProvider>
				</BrowserRouter>
			</WarningContextProvider>,
		);
	});

	test('Should display main section', () => {
		expect(screen.getByRole('main')).toBeInTheDocument();
	});
   test('Should display there id nothing to see component when the lenth of the data is equals to 0', () => { 
        fetchUsers.mockReturnValue({ data: [].length })
        if(fetchUsers.data === 0){
            expect(screen.getByRole('status', {hidden: true})).toBeInTheDocument();
        }
    });

    test('Should display the loading component when the data is loading', ()=>{
        fetchUsers.mockReturnValue({isLoading: true});

        if(fetchUsers.isLoading){
            expect(screen.getByRole('progressbar')).toBeInTheDocument();
        }
    });
});
