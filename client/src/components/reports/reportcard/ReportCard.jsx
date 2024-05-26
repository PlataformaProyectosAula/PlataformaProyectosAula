import styles from './ReportCard.module.scss';
import { useQuery } from 'react-query';
import { getProjectAuthor } from '../../../api/projectsApi';
import { Link } from 'react-router-dom';

export const ReportCard = ({ report }) => {

	const apiUrl = import.meta.env.VITE_REACT_APP_API_BASE_URL;

	const reportData = {
		title: report.attributes.title,
		description: report.attributes.description,
		file: `${apiUrl}${report.attributes.file}`,
		user: report.relationships.user.links.related,
		projectId:  report.relationships.post.links.id,
	};

	const { data: user } = useQuery(
		['project-author', reportData.user],
		() => getProjectAuthor(reportData.user),
		{
			onSuccess: (userData)=>{
				console.log(userData);
			}
		}
	);

	return (
		<div className={styles.card}>
			<p className={styles.card__text__bold}>{reportData.title}</p>
			<p className={styles.card__text__regular}>{reportData.description}</p>
			<p className={styles.card__text__light}>{user && user.user_name}</p>
			<Link to={`/project-details/${reportData.projectId}`} className={styles.card__link}>Ir al Proyecto Reportado</Link>
			<button
				className={styles.card__button}
				onClick={() => {
					window.open(reportData.file, '_blank');
				}}
			>
				Evidencia
			</button>
		</div>
	);
};

// ReportCard.propTypes = {
// 	report: PropTypes.shape({
// 		id: PropTypes.string,
// 		title: PropTypes.string,
// 		description: PropTypes.string,
// 		file: PropTypes.string,
// 	}),
// };
