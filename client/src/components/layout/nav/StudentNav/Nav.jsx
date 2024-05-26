// Styles
import styles from '../Nav.module.scss';
// Icons
import { FaHouseChimney, FaMagnifyingGlass } from 'react-icons/fa6';
import { FaBell } from 'react-icons/fa';
import { CgProfile } from 'react-icons/cg';
// Dependencies
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { LogOutButon } from '../../logoutbutton/LogOutButon';

export const Nav = () => {
	const [nav, setNav] = useState(false);
	
	return (
		<nav className={styles.nav} role='navigation'>
			<div className={styles.nav__imgContainer}>
				<img src={`https://i.pravatar.cc/150?u=${localStorage.getItem('userId')}`} alt='user icon' className={styles.nav__img} />
			</div>
			<div className={styles.nav__buttonContainer}>
				<button type='button' role='button' className={styles.nav__button}>
					<FaBell />
				</button>
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
					<Link role='link' to='/indexStudent' className={styles.nav__link}>
						<FaHouseChimney /> Inicio
					</Link>
				</li>
				<li>
					<Link role='link' to='/filter' className={styles.nav__link}>
						<FaMagnifyingGlass /> Buscar
					</Link>
				</li>
				<li>
					<Link role='link' to={`/profile/${localStorage.getItem('userId')}`} className={styles.nav__link}>
						<CgProfile /> Mi Pefil
					</Link>
				</li>
				<li>
					<LogOutButon componentClass={styles.nav__buttonLogOut}/>
				</li>
			</ul>
		</nav>
	);
};
