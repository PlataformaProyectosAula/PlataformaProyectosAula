import styles from './CommentCard.module.scss';
export const CommentCard = ({ comment }) => {
	const commentData = {
		content: comment.attributes.content,
		user: comment.relationships.user.attributes.user_name,
	}
	console.log(comment)
	return (
		<div className={styles.card}>
			<div className={styles.card__container}>
				<img src='https://i.pravatar.cc/150?u=c' alt='user image' className={styles.card__img}/>
				<p className={styles.card__text__bold}>{commentData.user}</p>
			</div>
			<p className={styles.card__text__regular}>{commentData.content}</p>
		</div>
	);
};
