// Styles
import styles from './ErrorPopUp.module.scss';
// Images
import iconError from '../../../assets/img/icons/error.svg';
// Dependencies
import { PropTypes } from 'prop-types';
import { useEffect, useState } from 'react';

export const ErrorPopUp = ({ message }) => {
	const [popUp, setPopUp] = useState(true);

	const handleClosePopUp = () => {
		setPopUp(false);
	};

	useEffect(() => {
		const main = document.querySelector('main');
		main.classList.add('removePadding');
	}, []);

	if (message !== undefined && message.includes) {
		console.log(message);
		if (message.includes('401')) {
			message = 'No puede realizar esta opercación';
		} else if (message.includes('403')) {
			message = 'El código proporcionado no es válido para el registro.';
		} else if (message.includes('409')) {
			message = 'Esta cuenta ya existe';
		} else if (message.includes('406')) {
			message = 'El usuario ya está registrado.';
		} else if (message.includes('500')) {
			message = 'Error en el servidor, intente mas tarde';
		} else {
			message = message;
		}
	}

	return (
		<div className={popUp ? styles.coverOpacity : styles.coverHidden}>
			<div className={styles.card}>
				<div className={styles.card__circle}>
					<img src={iconError} alt='Icon Error' className={styles.card__icon} />
				</div>
				<p className={styles.card__textBold}>Ha ocurrido un error</p>
				<p className={styles.card__textLight}>{message}</p>
				<button
					type='button'
					className={styles.card__button}
					onClick={handleClosePopUp}
				>
					Aceptar
				</button>
			</div>
		</div>
	);
};

ErrorPopUp.propTypes = {
	message: PropTypes.string,
};
