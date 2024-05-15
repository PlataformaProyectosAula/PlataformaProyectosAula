// Styles
import styles from './UserCard.module.scss';
// Request
import { activateUser } from '../../../api/usersApi';
import { deactivateUser } from '../../../api/usersApi';
// Dependencies
import { PropTypes } from 'prop-types';
import { QueryClient, useMutation } from 'react-query';

export const UserCard = ({ user }) => {
	const userData = {
		id: user.id,
		user_name: user.attributes && user.attributes.user_name,
		code: user.attributes && user.attributes.code,
		email: user.attributes && user.attributes.email,
		description: user.attributes && user.attributes.description,
		role: user.attributes && user.attributes.role_id,
		state: user.attributes && user.attributes.state,
	};

	const queryClient = new QueryClient();

	const activateUserMutation = useMutation(activateUser, {
		onSuccess: () => {
			queryClient.invalidateQueries(['users']);
		},
	});

	const deactivateUserMutation = useMutation(deactivateUser, {
		onSuccess: () => {
			queryClient.invalidateQueries(['users']);
		},
	});

	const changeUserState = async () => {
		if (user.data.attributes.state === '0') {
			await activateUserMutation(user.data.id);
		} else if (user.data.attributes.state === '1') {
			await deactivateUserMutation(user.data.id);
		}
	};

	return (
		<>
			<div data-testid='user-card' className={styles.card}>
				<img alt='user icon' role='img' className={styles.card__img} />
				<div className={styles.card__container}>
					<p className={styles.card__textBold}>{userData.user_name}</p>
					<p className={styles.card__textBold}>
						{userData.role === 2
							? 'Estudiante'
							: userData.role === 3
								? 'Profesor'
								: ''}
					</p>
					<p className={styles.card__textLight}>{userData.code}</p>
					<p className={styles.card__textLight}>{userData.email}</p>
				</div>
			</div>
			<button
				role='button'
				type='button'
				className={
					userData.state === '1'
						? styles.buttonDeactivate
						: styles.buttonActivate
				}
				onClick={() => changeUserState()}
			>
				{userData.state === '1' ? 'Desactivar' : 'Activar'}
			</button>
			<hr className={styles.card__hr} />
		</>
	);
};

UserCard.propTypes = {
	user: PropTypes.shape({
		data: PropTypes.shape({
			id: PropTypes.number,
			attributes: PropTypes.shape({
				email: PropTypes.string.isRequired,
				code: PropTypes.number.isRequired,
				description: PropTypes.string.isRequired,
				state: PropTypes.number.isRequired,
				role_id: PropTypes.number.isRequired,
			}),
		}),
	}).isRequired,
};
