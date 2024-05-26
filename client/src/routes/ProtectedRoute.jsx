import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = ({ role }) => {
	const userToken = localStorage.getItem('token');
	const userRole = localStorage.getItem('role');

	if (!userToken) {
		return <Navigate to='/' />;
	} else if (userRole !== role) {
		return <Navigate to='*' />;
	}

	return <Outlet />;
};
