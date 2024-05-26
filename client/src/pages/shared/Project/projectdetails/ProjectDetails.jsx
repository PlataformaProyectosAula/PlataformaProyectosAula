// Styles
import styles from './ProjectDetails.module.scss';
// Icons
import { FaHeart } from 'react-icons/fa';
import { FaCommentAlt } from 'react-icons/fa';
// Request
import {
	getFile,
	getProjectAuthor,
	getProjectRequest,
} from '../../../../api/projectsApi';
// Dependencies
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { useState } from 'react';
import moment from 'moment';
// Components
import { Nav as StudentNav } from '../../../../components/layout/nav/StudentNav/Nav';
import { Nav as AdminNav } from '../../../../components/layout/nav/AdminNav/Nav';
import { Nav as ProfessorNav } from '../../../../components/layout/nav/ProfessorNav/Nav';
import { ErrorPopUp } from '../../../../components/utils/error/ErrorPopUp';
import PacmanLoader from 'react-spinners/PacmanLoader';
import GridLoader from 'react-spinners/GridLoader';
import { CommentSection } from '../../../../components/comments/commentsection/CommentSection';

export const ProjectDetails = () => {
	const [postData, setPostData] = useState({});
	const [files, setFiles] = useState({ cover: '', file: '' });
	const [authorInfo, setAuthorInfo] = useState({
		user_name: '',
		carrera: '',
		semestre: '',
	});
	const role = parseInt(localStorage.getItem('role'));
	const { projectId } = useParams();

	const { data, isError, error, isLoading } = useQuery(
		['project', projectId],
		() => getProjectRequest(projectId),
		{
			onSuccess: async (data) => {
				setPostData({
					title: data.data.data.attributes.title,
					description: data.data.data.attributes.description,
					publicationDate: moment(
						data.data.data.attributes.created_at,
					).fromNow(),
				});
				getFiles(data.data.data.relationships.file.links.related);
				const author = await getProjectAuthor(
					data.data.data.relationships.user.links.related,
				);
				setAuthorInfo((prevData) => ({
					...prevData,
					user_name: author.user_name,
					carrera: author.carrera,
					semestre: author.semestre,
				}));
			},
		},
	);
	const getFiles = async (url) => {
		const respose = await getFile(url);
		console.log('response', respose);
		setFiles((prev) => ({
			...prev,
			cover: respose.cover,
			file: respose.file,
		}));
	};

	return (
		<>
			{isError && <ErrorPopUp message={error.message} />}
			<main className={styles.main}>
				{role === 1 && <AdminNav />}
				{role === 2 && <StudentNav />}
				{role === 3 && <ProfessorNav />}
				<section className={styles.section}>
					{isLoading && (
						<div className={styles.loaderContainer} role='progressbar'>
							<PacmanLoader color='#0A84F4' />
						</div>
					)}
					{data && (
						<>
							<div className={styles.card}>
								<div className={styles.card__imgContainer}>
									{files.cover === '' ? (
										<div className={styles.loaderContainer} role='progressbar'>
											<GridLoader color='#0A84F4' />
										</div>
									) : (
										<img
											src={files.cover}
											alt='project cover'
											className={styles.card__img}
										/>
									)}
								</div>
								<div className={styles.card__contentContainer}>
									<p className={styles.card__title}>{postData.title}</p>
									<p className={styles.card__text}>{postData.description}</p>
									{authorInfo.user_name !== '' && (
										<div className={styles.card__contentContainer__container}>
											<p
												className={styles.card__text__light}
											>{`${authorInfo.user_name}`}</p>
											<p className={styles.card__text__light}>
												{postData.publicationDate}
											</p>
											<p
												className={styles.card__text__light}
											>{`${authorInfo.carrera} - Semestre ${authorInfo.semestre}`}</p>
										</div>
									)}
									<div>
										<button
											className={styles.card__button__download}
											onClick={() => {
												window.open(files.file, '_blank');
											}}
										>
											Archivo del proyecto
										</button>
									</div>
								</div>
								<div className={styles.card__buttonContainer}>
									<div className={styles.card__wrapper}>
										<button type='button' className={styles.card__buttonLike}>
											<FaHeart />
										</button>
										<p className={styles.card__text__light}>12</p>
									</div>
									<div className={styles.card__wrapper}>
										<button
											type='button'
											className={styles.card__buttonComment}
										>
											<FaCommentAlt />
										</button>
										<p className={styles.card__text__light}>20</p>
									</div>
								</div>
							</div>
							<div className={styles.wrapper}>
								{/* <h3 className={styles.wrapper__title}>Comentarios</h3> */}
								<CommentSection projectId={projectId}/>
							</div>
						</>
					)}
				</section>
			</main>
		</>
	);
};
