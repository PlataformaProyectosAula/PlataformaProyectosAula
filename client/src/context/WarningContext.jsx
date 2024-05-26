import { createContext, useState } from 'react';

const WarningContext = createContext();

const WarningContextProvider = ({ children }) => {
	const [visible, setVisible] = useState({
        deactivateUserWarning: false,
		listUsersError: false,
		logoutError: false,
		deleteMyProjectError: false,
		deleteMyProjectSuccess: false,
    });

	return (
		<WarningContext.Provider value={{ visible, setVisible }}>
			{children}
		</WarningContext.Provider>
	);
};

export { WarningContext, WarningContextProvider };
