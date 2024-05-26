// Styles
import styles from '../Nav.module.scss';
// Icons
import { FaHouseChimney, FaMagnifyingGlass } from 'react-icons/fa6';
// Dependencies
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { LogOutButon } from '../../logoutbutton/LogOutButon';

export const Nav = () => {
	const [nav, setNav] = useState(false);

	return (
		<nav role='navigation' className={styles.nav}>
			<div className={styles.nav__buttonContainer}>
				<button
					type='button'
					role='button'
					className={styles.nav__buttonNav}
					onClick={() => setNav(!nav)}
				>
					<span className={styles.nav__span}></span>
					<span className={styles.nav__span}></span>
					<span className={styles.nav__span}></span>
				</button>
			</div>
			<ul
				role='nav'
				className={nav ? styles.nav__list : styles.nav__listHidden}
			>
				<li>
					<Link role='link' to='/indexProfessor' className={styles.nav__link}>
						<FaHouseChimney /> Inicio
					</Link>
				</li>
				<li>
					<Link role='link' to='/filter' className={styles.nav__link}>
						<FaMagnifyingGlass /> Buscar
					</Link>
				</li>
				<li>
					<LogOutButon componentClass={styles.nav__buttonLogOut}/>
				</li>
			</ul>
		</nav>
	);
};
