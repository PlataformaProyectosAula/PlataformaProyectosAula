//Styles
import styles from '../../student/Start/IndexStudent.module.scss';
// Components
import { Nav } from '../../../components/layout/nav/ProfessorNav/Nav';
import { TrendingIndex } from '../../../components/project/trending/trendingindex/TrendingIndex';

export const IndexProfessor = () => {
	return (
		<>
			<main className={styles.main}>
				<Nav />
				{/* <section className={styles.section}>
					<h3 className={styles.section__title}>Anuncios</h3>
				</section> */}
				<TrendingIndex />
			</main>
		</>
	);
};
