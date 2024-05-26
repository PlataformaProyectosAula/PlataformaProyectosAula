// styles
import styles from './Reports.module.scss';
// Components
import { Nav } from '../../../components/layout/nav/AdminNav/Nav';
import { ReportCard } from '../../../components/reports/reportcard/ReportCard';
import { useQuery } from 'react-query';
import { getReports } from '../../../api/reportsApi';
import ClipLoader from 'react-spinners/ClipLoader';

export const Reports = () => {
	const { isLoading, data } = useQuery(['reports'], () => getReports(), {
		onSuccess: (data) => console.log(data),
	});
	return (
		<>
			<main>
				<Nav />
				<section className={styles.section}>
					<h1 className={styles.section__title}>Reportes</h1>
					{isLoading && (
						<div className={styles.section__loader} role='progressbar'>
							<ClipLoader
								color='#0A84F4'
								size={40}
								cssOverride={{ alignSelf: 'center' }}
							/>
						</div>
					)}
					<article className={styles.article}>
						{data !== undefined &&
							data.map((report) => (
								<ReportCard report={report} key={report.id} />
							))}
					</article>
				</section>
			</main>
		</>
	);
};
