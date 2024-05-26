// Styles
import styles from './MainProjectsSection.module.scss';
// Components
import { TrendingSection } from '../trending/TrendingSection';
import { ForYouSection } from '../foryou/ForYouSection';
// Dependencies
import { useState } from 'react';
import { AllSection } from '../all/AllSection';

export const MainProjectsSection = () => {
	const [section, setSection] = useState({
		trending: true,
		foryou: false,
		all: false,
	});

	const role = localStorage.getItem('role');

	const handleSetSection = (toUpdateSection) => {
		const sectionsNewState = {
			projects: false,
			groups: false,
			careers: false,
		};

		sectionsNewState[toUpdateSection] = true;

		setSection(sectionsNewState);
	};
	return (
		<section className={styles.section}>
			<div className={styles.section__buttonContainer}>
				<button
					type='button'
					onClick={() => handleSetSection('trending')}
					className={
						section.trending
							? styles.section__buttonActive
							: styles.section__button
					}
				>
					Tendencias
				</button>
				{role === '2' && (
					<button
						onClick={() => handleSetSection('foryou')}
						type='button'
						className={
							section.foryou
								? styles.section__buttonActive
								: styles.section__button
						}
					>
						Para ti
					</button>
				)}
				<button
					onClick={() => handleSetSection('all')}
					type='button'
					className={
						section.all ? styles.section__buttonActive : styles.section__button
					}
				>
					Todos
				</button>
			</div>
			<>
				{section.trending && <TrendingSection />}
				{section.foryou && <ForYouSection />}
				{section.all && <AllSection />}
			</>
		</section>
	);
};
