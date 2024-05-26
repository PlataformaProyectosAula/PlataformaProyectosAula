import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import styles from './CommentForm.module.scss';
import axios from 'axios';

const baseUrl = import.meta.env.VITE_REACT_APP_API_URL;

const createComment = async (newComment) => {
	newComment = {
    data: {
      attributes: {
        content: newComment.content,
        postId: newComment.projectId
      }
    }
	};
	try {
		const response = await axios.post(
			`${baseUrl}comment`,
			newComment,
			{
				headers: {
					'ngrok-skip-browser-warning': true,
					Accept: 'application/json',
					Authorization: `Bearer ${localStorage.getItem('token')}`,
				},
			},
		);
		return response.data;
	} catch (error) {
		throw error;
	}
};

const useCreateComment = (projectId) => {
	const queryClient = useQueryClient();

	return useMutation(createComment, {
		onSuccess: () => {
			queryClient.invalidateQueries(['comments', projectId]);
		},
	});
};

export const CommentForm = ({ projectId }) => {
	const [comment, setComment] = useState({
		content: '',
		projectId: projectId,
	});

	const { mutateAsync } = useCreateComment(projectId);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await mutateAsync(comment);
    setComment((prev) => ({...prev, content: '' }));

		} catch (error) {
			console.error(error);
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<textarea
				cols='30'
				rows='10'
				className={styles.form__textarea}
				placeholder='Deja tu comentario'
      value={comment.content}
				onChange={(e) => {
					setComment((prev) => ({ ...prev, content: e.target.value }));
				}}
			></textarea>
			<hr className={styles.form__separator} />
			<button type='submit' className={styles.form__button}>
				Comentar
			</button>
		</form>
	);
};
