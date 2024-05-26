import { render, screen, waitFor } from '@testing-library/react';
// Component
import { ForYouSection } from './ForYouSection';
// Dependencies
import { QueryClient, QueryClientProvider } from 'react-query';
import nock from 'nock';

const queryClient = new QueryClient();

describe('Project For Students Component Test', () => {
	beforeEach(() => {
		render(
			<QueryClientProvider client={queryClient}>
				<ForYouSection />
			</QueryClientProvider>,
		);
	});

	test('should render the section ', () => {
		expect(screen.getByTestId('foryou-section')).toBeInTheDocument();
	});

	test('should display the is loading component when the request is loading', () => {
		const getProjectsForStudent = jest.fn();
		getProjectsForStudent.mockReturnValue({ isLoading: true });
		expect(screen.getByRole('progressbar')).toBeInTheDocument();
	});

	test('should render there is nothing to see component when the status of the request id 204', async () => {
		nock('https://d9f0-181-143-211-148.ngrok-free.app')
			.get('/api/post//relevant/students')
			.reply(204, { data: '' });

		waitFor(async () => {
			await expect(screen.getByRole('progressbar')).not.toBeInTheDocument();
		});

		waitFor(async () => {
			await expect(screen.getByRole('status')).toBeInTheDocument();
		});
	});

	test('should render projects when the request is successful', async () => {
		nock('https://d9f0-181-143-211-148.ngrok-free.app')
			.get('/api/post/relevant/students')
			.reply(200, [{}, {}, {}, {}]);

		waitFor(async () => {
            await expect(screen.getByRole('progressbar')).not.toBeInTheDocument();
            await expect(screen.getByRole('status')).not.toBeInTheDocument();
        });

		waitFor(async () => {
			await expect(screen.getByTestId('foryou-projects')).toBeInTheDocument();
		});
	});
});
