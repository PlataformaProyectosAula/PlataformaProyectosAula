// Request
import { useQuery } from 'react-query';
import { getAllProjectsRequest } from '../../../../../api/projectsApi';
// Component
import { ProjectCard } from '../../../projectcard/ProjectCard';
import PacmanLoader from 'react-spinners/PacmanLoader';

export const AllSection = () => {
	const { isLoading, data: projects } = useQuery({
		queryKey: ['projects'],
		queryFn: getAllProjectsRequest,
	});

	return (
		<div style={sectionStyles}>
			{isLoading && (
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<PacmanLoader color='#004D95' cssOverride={{ alignSelf: 'center' }} />
				</div>
			)}

			{projects &&
				projects.map((project) => (
					<ProjectCard project={project} key={project.id} />
				))}
		</div>
	);
};

const sectionStyles = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '2rem',
	width: '80%',
	margin: '2rem auto',
};
