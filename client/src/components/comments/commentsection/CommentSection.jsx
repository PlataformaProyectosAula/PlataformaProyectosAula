import { CommentForm } from '../../comments/commentform/CommentForm';
import { CommentCard } from '../../comments/commentcard/CommentCard';
import { getComments } from '../../../api/commentsApi';
import { useQuery } from 'react-query';
import GridLoader from 'react-spinners/GridLoader';

export const CommentSection = ({ projectId }) => {
	const role = localStorage.getItem('role');
	const { isLoading, data } = useQuery(['comments', projectId], () =>
		getComments(projectId),
	);
	return (
		<div>
			{role === '3' && <CommentForm />}
			{isLoading && (
				<div role='progressbar' style={{ width: '20%', margin: '4rem auto' }}>
					<GridLoader color='#0A84F4' />
				</div>
			)}
			{data !== undefined &&
				data.map((comment) => (
					<CommentCard comment={comment} key={comment.id} />
				))}
		</div>
	);
};
