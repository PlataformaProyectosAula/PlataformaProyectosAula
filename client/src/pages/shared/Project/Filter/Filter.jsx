// Styles
import styles from './Filter.module.scss';
// Icons
import { PiMagnifyingGlassFill } from 'react-icons/pi';
import robotImg from '../../../../assets/img/icons/robot.png';
// Request

// Components
import { Nav as AdminNav } from '../../../../components/layout/nav/AdminNav/Nav';
import { Nav as StudentNav } from '../../../../components/layout/nav/StudentNav/Nav';
import { Nav as ProfessorNav } from '../../../../components/layout/nav/ProfessorNav/Nav';
import { MainProjectsSection } from '../../../../components/project/filtersections/projects/main/MainProjectsSection';
// Dependencies
import { useState } from 'react';
import { Careers } from '../../../../components/project/filtersections/careers/careerssection/Careers';
import { useQuery } from 'react-query';
import { filterProjects } from '../../../../api/projectsApi';
import { ProjectCard } from '../../../../components/project/projectcard/ProjectCard';
import { NothingToSee } from '../../../../components/utils/NothingToSee/NothingToSee';

export const Filter = () => {
	const role = parseInt(localStorage.getItem('role'));
	const [section, setSection] = useState({
		projects: true,
		groups: false,
		careers: false,
	});

	const [input, setInput] = useState('');

	const handleSetSection = (toUpdateSection) => {
		const sectionsNewState = {
			projects: false,
			groups: false,
			careers: false,
		};

		sectionsNewState[toUpdateSection] = true;

		setSection(sectionsNewState);
	};

	const { isLoading, data } = useQuery(
		['filter'],
		() => filterProjects(input),
		{ onSuccess: (filterData) => console.log(filterData) },
	);

	return (
		<>
			<main>
				{role === 1 && <AdminNav />}
				{role === 2 && <StudentNav />}
				{role === 3 && <ProfessorNav />}
				<section className={styles.section}>
					<h2 className={styles.section__title}>Buscador</h2>
					<form className={styles.form}>
						<div className={styles.form__container}>
							<input
								type='text'
								name='buscar'
								placeholder='Buscar Proyecto'
								className={styles.form__input}
								onChange={(e) => setInput(e.target.value)}
							/>
						</div>
					</form>
					<div className={styles.section__wrapper}>
						<button
							type='button'
							className={styles.section__button}
							onClick={() => handleSetSection('projects')}
						>
							Proyectos
						</button>
						<button
							type='button'
							className={styles.section__button}
							onClick={() => handleSetSection('groups')}
						>
							Grupos
						</button>
						<button
							type='button'
							className={styles.section__button}
							onClick={() => handleSetSection('careers')}
						>
							Carreras
						</button>
					</div>
					<div className={styles.section__imgContainer}>
						<img
							src={robotImg}
							alt='robot image'
							className={styles.section__img}
						/>
					</div>
				</section>
				{data !== undefined && (
					<div
						style={{
							margin: '2rem auto',
							width: '70%',
							display: 'flex',
							flexDirection: 'column',
							gap: '1.5rem',
						}}
					>
						{/* {(data !== undefined && data === 'NotFound') && <NothingToSee />} */}
						{data !== undefined &&
							Array.isArray(data) &&
							data.map((project) => (
								<ProjectCard project={project} key={project.id} />
							))}
					</div>
				)}
				{input === '' && (
					<>
						{section.projects && <MainProjectsSection />}
						{section.groups && <h3>Groups</h3>}
						{section.careers && <Careers />}
					</>
				)}
			</main>
		</>
	);
};
