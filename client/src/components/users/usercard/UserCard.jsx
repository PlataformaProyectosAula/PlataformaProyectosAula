import { useMutation } from 'react-query';
// Styles
import styles from './UserCard.module.scss';
// Request
import { changeUserStateRequest } from '../../../api/usersApi';
// Dependencies
import { PropTypes } from 'prop-types';
import { QueryClient } from 'react-query';
import { useState } from 'react';
export const UserCard = ({ user, page }) => {
	const [userData, setUserData] = useState({
		id: user.id,
		user_name: user.attributes && user.attributes.user_name,
		code: user.attributes && user.attributes.code,
		email: user.attributes && user.attributes.email,
		description: user.attributes && user.attributes.description,
		role: user.attributes && user.attributes.role_id,
		state: user.attributes && user.attributes.state,
		carrera: user.attributes.carrera,
		departamento: user.attributes.departamento,
		semestre: user.attributes.semestre,
	});

	const queryClient = new QueryClient();

	const changeStateMutation = useMutation((id) => changeUserStateRequest(id), {
		onSuccess: () => {
			setUserData((prevUserData) => ({
				...prevUserData,
				state: prevUserData.state === '1' ? '0' : '1',
			}));
			queryClient.invalidateQueries(['users', page]);
		},
	});

	const changeUserState = async (id) => {
		await changeStateMutation.mutateAsync(id);
	};

	return (
		<>
			<div data-testid='user-card' className={styles.card}>
				<img
					alt='user icon'
					role='img'
					className={styles.card__img}
					src={`https://i.pravatar.cc/150?u=${userData.id}`}
				/>
				<div className={styles.card__container}>
					<p className={styles.card__textBold}>{userData.user_name}</p>
					<p className={styles.card__textRegular}>
						{userData.role === 2
							? 'Estudiante de ' +
								userData.carrera +
								', ' +
								'Semestre ' +
								userData.semestre
							: userData.role === 3
								? 'Profesor del ' + userData.departamento
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
				onClick={() => changeUserState(userData.id)}
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
