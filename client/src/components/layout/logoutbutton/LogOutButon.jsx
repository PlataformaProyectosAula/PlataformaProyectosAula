// Icon
import { IoLogOut } from 'react-icons/io5';
// Dependencies
import { isError, useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
// Request
import { logoutRequest } from '../../../api/authApi';
import { ErrorPopUp } from '../../utils/error/ErrorPopUp';
import { useContext } from 'react';
import { WarningContext } from '../../../context/WarningContext';

export const LogOutButon = ({ componentClass }) => {
	const logoutMutation = useMutation(logoutRequest);

	const QueryClient = useQueryClient();

	const { setVisible } = useContext(WarningContext);

	const navigate = useNavigate();

	const handleLogOut = async () => {
		const token = localStorage.getItem('token');
		if (token === undefined) {
			setVisible((previous) => {
				setVisible({ ...previous, logoutError: true });
			});
		} else {
			try {
				await logoutMutation.mutateAsync(token, {
					onSuccess: (data) => {
						QueryClient.clear();
						if (data === 204) {
							navigate('/');
						}
					},
				});
			} catch (error) {
				setVisible((previous) => {
					setVisible({ ...previous, logoutError: true });
				});
				console.log(error);
			}
		}
	};

	return (
		<>
			{isError.message && <ErrorPopUp message={logoutMutation.error.message} />}
			<button
				className={componentClass}
				type='button'
				role='button'
				onClick={() => {
					handleLogOut();
				}}
			>
				<IoLogOut /> Cerrar Sesión
			</button>
		</>
	);
};
