//Styles
import styles from './IndexStudent.module.scss';
// Dependencies
import { Link } from 'react-router-dom';
import PacmanLoader from 'react-spinners/PacmanLoader';
import { useQuery } from 'react-query';
// Request
import { getProjectsForStudent } from '../../../api/projectsApi';
// Components
import { Nav } from '../../../components/layout/nav/StudentNav/Nav';
import { ProjectCard } from '../../../components/project/projectcard/ProjectCard';
import { ErrorPopUp } from '../../../components/utils/error/ErrorPopUp';
import { TrendingIndex } from '../../../components/project/trending/trendingindex/TrendingIndex';

export const IndexStudent = () => {
	const { isLoading, isError, error, data: projects } = useQuery(
		['projectsInterest'],
		() => getProjectsForStudent(),
	);

	const projectsinterest = projects?.slice(0, 5);

	return (
		<>
			{isError && <ErrorPopUp message={error.message}/>}
			<main className={styles.main}>
				<Nav />
				{/* <section className={styles.section}>
					<h3 className={styles.section__title}>Anuncios</h3>
				</section> */}

				<TrendingIndex />
				<section className={styles.section}>
					<h3 className={styles.section__title}>Para ti</h3>
					{isLoading ? (
						<div className={styles.section__loaderContainer}>
							<PacmanLoader
								color='#004D95'
								cssOverride={{ alignSelf: 'center' }}
							/>
						</div>
					) : (
						<div className={styles.wrapper}>
							{projectsinterest.map((project) => (
								
									<ProjectCard project={project} key={project.id} />
						
							))}
							<Link className={styles.section__link} to="../filter">Ver mas...</Link>
						</div>
					)}
				</section>
			</main>
		</>
	);
};
