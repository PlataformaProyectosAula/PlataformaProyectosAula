// Components
import { Nav as AdminNav } from '../../../components/layout/nav/AdminNav/Nav';
import { Nav as StudentNav } from '../../../components/layout/nav/StudentNav/Nav';
import { Nav as ProfessorNav } from '../../../components/layout/nav/ProfessorNav/Nav';
import { ProjectCard } from '../../../components/project/projectcard/ProjectCard';
import { ErrorPopUp } from '../../../components/utils/error/ErrorPopUp';
import { NothingToSee } from '../../../components/utils/NothingToSee/NothingToSee';
import PacmanLoader from 'react-spinners/PacmanLoader';
// Dependencies
import { useQuery } from 'react-query';
// Request
import { getCareerProjectsRequest } from '../../../api/careersApi';
import { useParams } from 'react-router-dom';

export const ProjectsCareer = () => {
	const role = localStorage.getItem('role');
	const { id } = useParams();

	const { isLoading, isError, error, data } = useQuery(
		['projects-career'],
		() => getCareerProjectsRequest(id),
	);

	return (
		<>
			{isError && (
				<div role='alert'>
					<ErrorPopUp message={error.message} />{' '}
				</div>
			)}
			<main role='main'>
				{role === 1 ? (
					<AdminNav />
				) : role === 2 ? (
					<StudentNav />
				) : role === 3 ? (
					<ProfessorNav />
				) : (
					<StudentNav />
				)}
				<section style={sectionStyles}>
					<h1 style={{ textAlign: 'justify', color: '#271231', fontSize: '1.9rem'}}>{id}</h1>
					{isLoading && (
						<div>
							<PacmanLoader color='#004D95' />
						</div>
					)}
					<div role='status'>{data === 204 && <NothingToSee />}</div>
					{data !== undefined &&
						data.map((project) => (
							<ProjectCard project={project} key={project.id} />
						))}
				</section>
			</main>
		</>
	);
};

const sectionStyles = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '1.5rem',
	width: '80%',
	margin: '2rem auto',
};
