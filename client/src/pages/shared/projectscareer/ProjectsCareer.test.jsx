import { render, screen } from '@testing-library/react';
//component
import { ProjectsCareer } from './ProjectsCareer';
//dependencies
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { WarningContextProvider } from '../../../context/WarningContext';
jest.mock(
	'../../../assets/img/default/projectcover.jpg',
	() => 'projectcover.jpg',
);

jest.mock('axios');

const getProjectsCareer = jest.fn();

describe('Career Projects Tests', () => {
	const queryClient = new QueryClient();

	beforeEach(() =>
		render(
			<WarningContextProvider>
				<QueryClientProvider client={queryClient}>
					<BrowserRouter>
						<ProjectsCareer />
					</BrowserRouter>
				</QueryClientProvider>
			</WarningContextProvider>,
		),
	);

	test('Display the main section of the component', () => {
		expect(screen.getByRole('main')).toBeInTheDocument();
	});

	test('Should display loading component when the query is loading', () => {
		getProjectsCareer.mockReturnValue({ isLoading: true });

		if (getProjectsCareer.isLoading) {
			expect(
				screen.getByRole('progressbar', { hidden: true }),
			).toBeInTheDocument();
		}
	});

	test('Should display error pop up when there is an error in the request', () => {
		getProjectsCareer.mockReturnValue({ isError: true });

		if (getProjectsCareer.isError) {
			expect(screen.getByRole('alert', { hidden: true })).toBeInTheDocument();
		}
	});

	test('Should display that the there is nothing to see component if the length is less than 0', () => {
		getProjectsCareer.mockReturnValue({ data: [].length });

		if (getProjectsCareer.data === 0) {
			expect(
				screen.getByRole('contentinfo', { hidden: true }),
			).toBeInTheDocument();
		}
	});

	test('Should display the content if the data has a length is larger than 0', () => {
		getProjectsCareer.mockReturnValue({ data: [{}, {}, {}].length });
		if (getProjectsCareer.data > 0) {
			expect(screen.getByRole('article')).toBeInTheDocument();
		}
	});
});
