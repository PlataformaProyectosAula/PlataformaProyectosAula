// Styles
import styles from './NotFound.module.scss';
// Image
import image from '../../../assets/img/default/NotFound.jpg';
// Dependencies
import { Link } from 'react-router-dom';
export const NotFound = () => {
	return (
		<main className={styles.main}>
			<img src={image} alt='404 image' className={styles.main__img}/>
			<Link to='/' className={styles.main__link}>IR AL INICIO DE SESIÓN</Link>
		</main>
	);
};
