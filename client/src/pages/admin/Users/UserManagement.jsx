// Dependencies
import { useContext } from 'react';
// Components
import { Nav } from '../../../components/layout/nav/AdminNav/Nav';
import { UsersList } from '../../../components/users/usersList/UsersList';
import { ConfirmationPopUp } from '../../../components/utils/confirmation/ConfirmationPopUp';
// Context
import { WarningContext } from '../../../context/WarningContext';
import { ErrorPopUp } from '../../../components/utils/error/ErrorPopUp';

export const UserManagement = () => {
	const { visible, setVisible } = useContext(WarningContext);

	return (
		<>
			<Nav />
			{visible && visible.deactivateUserWarning && <ConfirmationPopUp message="¿Esta seguro de querer desactvar el perfil?" visible={visible} setVisible={setVisible} />}
			{visible && visible.listUsersError && <ErrorPopUp message="Ha ocurrido un error al tratar de listar los usuarios" />}
			{visible && visible.logoutError && <ErrorPopUp message="Ha ocurrido un error al tratar de cerrar sesión" />}
			<main>
				<UsersList />
			</main>
		</>
	);
};
