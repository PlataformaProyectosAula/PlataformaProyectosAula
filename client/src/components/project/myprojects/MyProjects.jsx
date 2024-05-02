// Styles
import styles from './MyProjects.module.scss';
// Request
import { getMyProjects } from '../../../api/profileApi';
// Dependencies
import PropTypes from 'prop-types';
// Components
import { ProjectCard } from '../projectcard/ProjectCard';
import { useQuery } from 'react-query';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { NothingToSee } from '../../utils/NothingToSee/NothingToSee';

export const MyProjects = ({ userId }) => {
	const { isLoading, data } = useQuery({
		queryKey: ['projects', { userId }],
		queryFn: getMyProjects(userId),
	});

	return (
		<>
			{isLoading && (
				<div className={styles.loaderContainer} role='progressbar'>
					<PacmanLoader color='#0A84F4' cssOverride={{ alignSelf: 'center' }} />
				</div>
			)}
			<section role='main' className={styles.section}>
				{data && data.length === 0 && (
					<div role='status'>
						<NothingToSee />
					</div>
				)}
				{data &&
					data.map((project) => (
						<ProjectCard project={project} key={project.id} />
					))}
			</section>
		</>
	);
};

MyProjects.propTypes = {
	userId: PropTypes.number,
};
