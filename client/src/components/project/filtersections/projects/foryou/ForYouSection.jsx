// Components
import { ProjectCard } from '../../../projectcard/ProjectCard';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { NothingToSee } from '../../../../utils/NothingToSee/NothingToSee';
// Request
import { getProjectsForStudent } from '../../../../../api/projectsApi';
// Dependencies
import { useQuery } from 'react-query';

export const ForYouSection = () => {
	const { isLoading, data } = useQuery(
		['foryou'],
		() => getProjectsForStudent(localStorage.getItem('token')),
	);

	return (
		<div data-testid='foryou-section' style={sectionStyles}>
			{isLoading && (
				<div
					role='progressbar'
					style={{ display: 'flex', justifyContent: 'center' }}
				>
					<PacmanLoader color='#004D95' cssOverride={{ alignSelf: 'center' }} />
				</div>
			)}
			{data && data === 204 && (
				<div role='status'>
					<NothingToSee />
				</div>
			)}
			{data &&
				data.map((project) => (
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
