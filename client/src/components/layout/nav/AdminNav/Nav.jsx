//Styles
import styles from './Nav.module.scss';
//Icons
import { FaMagnifyingGlass, FaUsers } from 'react-icons/fa6';
import { FaBell } from 'react-icons/fa';
import { MdReport } from 'react-icons/md';
//Dependencies
import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { LogOutButon } from '../../logoutbutton/LogOutButon';

export const Nav = () => {
	const [nav, setNav] = useState(false);

	return (
		<nav role='navigation' className={styles.nav}>
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
			<ul
				role='nav'
				className={nav ? styles.nav__list : styles.nav__listHidden}
			>
				{/* <li>
					<button type='button' role='button' className={styles.nav__buttonNav}>
						<FaBell /> Notificaciones
					</button>
				</li> */}
				<div className={styles.nav__container}>
					<span className={styles.nav__textBold}>DASHBOARD</span><span className={styles.nav__textLight}>ADMIN</span>
				</div>
				<li>
					<NavLink role='link' className={({isActive}) => (isActive ? styles.nav__link__active : styles.nav__link)} to='/user-management'>
						<FaUsers /><p className={styles.nav__link__text}>Usuarios</p>
					</NavLink>
				</li>
				<li>
					<NavLink role='link' className={({isActive}) => (isActive ? styles.nav__link__active : styles.nav__link)} to='/reports'>
						<MdReport /> <p className={styles.nav__link__text}>Reportes</p>
					</NavLink>
				</li>
				<li>
					<NavLink
						role='link'
						to='/filter'
						className={({isActive}) => (isActive ? styles.nav__link__active : styles.nav__link)}
					>
						<FaMagnifyingGlass />{' '}
						<p className={styles.nav__link__text}>Buscar</p>
					</NavLink>
				</li>
				<li>
					<LogOutButon componentClass={styles.nav__logoutButton} />
				</li>
			</ul>
		</nav>
	);
};
