// Styles
import styles from './ProjectCard.module.scss';
// Icons
import { FaHeart } from 'react-icons/fa';
import { FaCommentAlt } from 'react-icons/fa';
import { CiMenuKebab } from 'react-icons/ci';
// Dependencies
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Menu } from '../projectmenu/Menu';
import { QueryClient, useQuery } from 'react-query';
import { getFile, getProjectAuthor } from '../../../api/projectsApi';
import GridLoader from 'react-spinners/GridLoader';
import { giveLike, removeLike } from '../../../api/likesApi';

export const ProjectCard = ({ project }) => {
	const [projectData, setProjectData] = useState({
		id: project.id,
		title: project.attributes && project.attributes.title,
		description: project.attributes && project.attributes.description,
		files: project.attributes && project.relationships.file.links.related,
		authorUrl: project.attributes && project.relationships.user.links.related,
		likes: project.attributes && project.attributes.likes_count,
		likeState: project.attributes && project.attributes.dio_like,
		user_id: project.attributes && project.attributes.user_id,
	});
	const [menu, setMenu] = useState();
	const [projectAuthorId, setProjectAuthorId] = useState('');
	const [likeState, setLikeState] = useState(projectData.likeState);

	const closeMenu = () => {
		setMenu(false);
	};

    const { isLoading, data } = useQuery(['projectFile', projectData.id], () => getFile(projectData.files), {
        onSuccess: async () => {
            const ownerData = await getProjectAuthor(projectData.authorUrl);
            setProjectAuthorId(ownerData.id);
        },
    });

	const toggleLike = async () => {
        if (likeState === 0) {
            await giveLike(projectData.id);
            setLikeState(1);
        } else if (likeState === 1) {
            await removeLike(projectData.id);
            setLikeState(0);
        }
    };

	return (
		<article className={styles.card}>
			<div className={styles.card__imgContainer}>
				{isLoading && (
					<div className={styles.loaderContainer} role='progressbar'>
						<GridLoader color='#0A84F4' />
					</div>
				)}
				{data !== undefined && (
					<img
						src={data.cover}
						alt='project cover'
						className={styles.card__img}
					/>
				)}
			</div>
			<div>
				<button
					type='button'
					className={styles.card__buttonMenu}
					onClick={() => setMenu(true)}
				>
					<CiMenuKebab />
				</button>
				{menu && (
					<Menu
						closeMenu={closeMenu}
						projectId={project.id}
						authorId={JSON.stringify(projectData.user_id)}
					/>
				)}
			</div>
			<div className={styles.card__contentContainer}>
				<p className={styles.card__title}>{projectData.title}</p>
				<p className={styles.card__text}>
					{projectData && projectData.description.slice(0, 110)}...
					<Link
						to={`../project-details/${projectData.id}`}
						className={styles.card__link}
					>
						ver mas
					</Link>
				</p>
			</div>
			<div className={styles.card__buttonContainer}>
				<div className={styles.card__wrapper}>
					<button
						type='button'
						className={
							likeState === 1 ? styles.card__buttonLike__active : styles.card__buttonLike
						}
						onClick={toggleLike}
					>
						<FaHeart />
					</button>
					<p className={styles.card__text__light}>{projectData.likes}</p>
				</div>
				<div className={styles.card__wrapper}>
					<button type='button' className={styles.card__buttonComment}>
						<FaCommentAlt />
					</button>
				</div>
			</div>
		</article>
	);
};

ProjectCard.propTypes = {
	project: PropTypes.shape({
		id: PropTypes.string,
		cover: PropTypes.string,
		title: PropTypes.string,
		description: PropTypes.string,
		likes: PropTypes.number,
		comments: PropTypes.number,
	}),
};
