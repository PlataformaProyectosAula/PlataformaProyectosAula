//Styles
import styles from './TrendingIndex.module.scss';
// Dependencies
import { Link } from 'react-router-dom';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { useQuery } from 'react-query';
// Request
import { getTrendingProjectsRequest } from '../../../../api/projectsApi';
// Components
import { ProjectCard } from '../../../../components/project/projectcard/ProjectCard';
import Number from '../../../../components/project/trendnumber/Number';
import { NothingToSee } from '../../../utils/NothingToSee/NothingToSee';

export const TrendingIndex = () => {
	const { isLoading, data } = useQuery(['trending-projects'],
		getTrendingProjectsRequest
	);

	const trends = data !== undefined ? data.slice(0, 5) : [];

	return (
		<section className={styles.section}>
			<h3 className={styles.section__title}>Top Tendencias</h3>
			{data === 204 && <NothingToSee />}
			{isLoading && (
				<div className={styles.section__loaderContainer} role='progressbar'>
					<PacmanLoader color='#004D95' cssOverride={{ alignSelf: 'center' }} />
				</div>
			)}
			{data !== undefined && trends.length > 0 && (
				<div className='trending-project'>
					{trends.map((project) => (
						<div>
							<Number trendNumber={trends.indexOf(project) + 1} />
							<ProjectCard project={project} key={project.id} />
						</div>
					))}
					<div>
						<Link className={styles.section__link} to='../filter' role='link'>
							Ver mas...
						</Link>
					</div>
				</div>
			)}
		</section>
	);
};
