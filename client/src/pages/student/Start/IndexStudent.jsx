//Styles
import styles from './IndexStudent.module.scss';
// Dependencies

// Request

// Components
import { Nav } from '../../../components/layout/nav/StudentNav/Nav';
import { ProjectCard } from '../../../components/project/projectcard/ProjectCard';
import Number from '../../../components/project/trendnumber/Number';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getTrendingProjectsRequest } from '../../../api/projectsApi';
import { ErrorPopUp } from '../../../components/utils/error/ErrorPopUp';
import PacmanLoader from 'react-spinners/PacmanLoader';

export const IndexStudent = () => {
	const projects = [
		{
			id: 1,
			title: 'Lorem, ipsum dolor.',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit fugiat libero eius esse officiis ipsum. FLor...ver mas',
			likes: 40,
			comments: 50,
		},
		{
			id: 2,
			title: 'Lorem, ipsum dolor.',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit fugiat libero eius esse officiis ipsum. FLor...ver mas',
			likes: 40,
			comments: 50,
		},
		{
			id: 3,
			title: 'Lorem, ipsum dolor.',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit fugiat libero eius esse officiis ipsum. FLor...ver mas',
			likes: 40,
			comments: 50,
		},
		{
			id: 4,
			title: 'Lorem, ipsum dolor.',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit fugiat libero eius esse officiis ipsum. FLor...ver mas',
			likes: 40,
			comments: 50,
		},
		{
			id: 5,
			title: 'Lorem, ipsum dolor.',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit fugiat libero eius esse officiis ipsum. FLor...ver mas',
			likes: 40,
			comments: 50,
		},
		{
			id: 6,
			title: 'Lorem, ipsum dolor.',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit fugiat libero eius esse officiis ipsum. FLor...ver mas',
			likes: 40,
			comments: 50,
		},
		{
			id: 7,
			title: 'Lorem, ipsum dolor.',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit fugiat libero eius esse officiis ipsum. FLor...ver mas',
			likes: 40,
			comments: 50,
		},
		{
			id: 8,
			title: 'Lorem, ipsum dolor.',
			description:
				'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit fugiat libero eius esse officiis ipsum. FLor...ver mas',
			likes: 40,
			comments: 50,
		},
	];

	const trend = projects.slice(0, 3);

	const { isLoading, data, isError, error } = useQuery({
		queryKey: ['trending-projects'],
		queryFn: getTrendingProjectsRequest,
	});

	return (
		<>
			{/* {isError && <ErrorPopUp message={error.message}/>} */}
			<main className={styles.main}>
				<Nav />
				<section className={styles.section}>
					<h3 className={styles.section__title}>Anuncios</h3>
				</section>
				<section className={styles.section}>
					<h3 className={styles.section__title}>Tendencias</h3>
					{/* {isLoading ? (
						<div className={styles.section__loaderContainer}>
							<PacmanLoader
								color='#004D95'
								cssOverride={{ alignSelf: 'center' }}
							/>
						</div>
					) : (
						<>
							{trend.map((project) => (
								<div>
									<Number trendNumber={trend.indexOf(project) + 1} />
									<ProjectCard project={project} key={project.id} />
								</div>
							))}
							<Link className={styles.section__link}>Ver mas...</Link>
						</>
					)} */}
				</section>
				<section className={styles.section}>
					<h3 className={styles.section__title}>Para ti</h3>
				</section>
			</main>
		</>
	);
};
