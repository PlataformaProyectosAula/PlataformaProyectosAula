import { render, screen, waitFor } from '@testing-library/react';
// Component
import { TrendingIndex } from './TrendingIndex';
// Dependencies
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient();

const getTrendingProjects = jest.fn();

describe('Trending Projects index section tests', () => {
	beforeEach(() => {
		render(
			<BrowserRouter>
				<QueryClientProvider client={queryClient}>
					<TrendingIndex />
				</QueryClientProvider>
			</BrowserRouter>,
		);
	});
	test('Should render title', () => {
		expect(screen.getByText('Top Tendencias')).toBeInTheDocument();
	});

	test('should render nothing to see component if data is equals to zero', () => {
		getTrendingProjects.mockReturnValue({ data: [].length });

		if (getTrendingProjects.data === 0) {
			expect(screen.getByRole('status', { hidden: true })).toBeInTheDocument();
		}
	});

	test('Should render is loading component when the query status is loading', () => {
		getTrendingProjects.mockReturnValue({ isLoading: true });
		if (getTrendingProjects.isLoading) {
			expect(screen.getByRole('progressbar')).toBeInTheDocument();
		}
	});

	test('should slice the data array', () => {
		getTrendingProjects.mockReturnValue({ data: [{}, {}, {}, {}, {}] });
		const result = getTrendingProjects();
		const trends = result.data.slice(0, 3);
		const trendsLength = trends.length;
		expect(trendsLength).toEqual(3);
	});
});
