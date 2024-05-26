// Styles
import styles from './ConfirmationPopUp.module.scss';
// Icon
import iconConfirmation from '../../../assets/img/icons/exclamation.svg';
// Dependencies
import { PropTypes } from 'prop-types';

export const ConfirmationPopUp = ({ message, handleClose, onAccept}) => {

	return (
		<div className={styles.coverOpacity}>
			<div className={styles.card}>
				<div className={styles.card__circle}>
					<img
						src={iconConfirmation}
						alt='Icon Exclamation'
						className={styles.card__icon}
					/>
				</div>
				<p className={styles.card__textBold}>Advertencia</p>
				<p className={styles.card__textLight}>{message}</p>
				<div className={styles.card__buttonWrapper}>
					<button
						type='button'
						className={styles.card__buttonCancel}
						onClick={()=>handleClose()}
					>
						Cancelar
					</button>
                    <button type="button" className={styles.card__buttonAccept} onClick={()=>onAccept()}>Aceptar</button>
				</div>
			</div>
		</div>
	);
};

ConfirmationPopUp.propTypes = {
	message: PropTypes.string,
	handleClose: PropTypes.func,
	onAccept: PropTypes.func,
};
