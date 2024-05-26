// Styles
import styles from './Profile.module.scss';
// Icons
import { IoSettingsSharp } from 'react-icons/io5';
import icon from '../../../assets/img/default/profile-picture.jpg';
// Dependencies
import { useQuery } from 'react-query';
import { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
// Request
import { getProfile } from '../../../api/profileApi';
// Components
import { Nav } from '../../../components/layout/nav/StudentNav/Nav';
import { MyProjects } from '../../../components/project/myprojects/MyProjects';
import { ErrorPopUp } from '../../../components/utils/error/ErrorPopUp';
import { WarningContext } from '../../../context/WarningContext';
import { SuccessPopUp } from '../../../components/utils/success/SuccessPopUp';
export const Profile = () => {
	const [section, setSection] = useState({ projects: true, groups: false });
	const { visible } = useContext(WarningContext);

	const { userId } = useParams();

	const {
		isError,
		error,
		data: userProfile,
	} = useQuery(['profile', userId], () => getProfile(userId), {
		onSuccess: (data) => console.log(data),
	});

	return (
		<>
			{visible.deleteMyProjectError && <ErrorPopUp />}
			{visible.deleteMyProjectSuccess && (
				<SuccessPopUp message='Proyecto Eliminado' />
			)}
			{isError && <ErrorPopUp message={error.message} />}
			<main>
				<Nav />
				{userProfile !== undefined && (
					<section className={styles.profile}>
						{userProfile.id && userId === userProfile.id && (
							<button className={styles.profile__button}>
								<IoSettingsSharp />
							</button>
						)}
						<div className={styles.section__img__container}>
							<img
								src={`https://i.pravatar.cc/150?u=${userProfile?.id}`}
								alt='profile picture'
								className={styles.profile__img}
							/>
						</div>
						<div>
							<p className={styles.profile__text__bold}>
								{userProfile?.user_name}
							</p>
						</div>
						<p className={styles.profile__text__regular}>
							{userProfile?.description !== null
								? userProfile.description
								: 'Descrpción No Disponible'}
						</p>

						<div className={styles.profile__container}>
							<div className={styles.profile__rectangle}>
								{userProfile?.carrera}
							</div>
							<div className={styles.profile__rectangle}>
								Semestre:{' '}{userProfile?.semestre}
							</div>
						</div>
					</section>
				)}
				<section className={styles.section}>
					<div className={styles.section__button__container}>
						<button
							className={
								section.projects
									? styles.section__button__active
									: styles.section__button
							}
							onClick={() =>
								setSection((prev) => ({
									...prev,
									projects: true,
									groups: false,
								}))
							}
						>
							Mis Proyectos
						</button>
						<button
							className={
								section.groups
									? styles.section__button__active
									: styles.section__button
							}
							onClick={() =>
								setSection((prev) => ({
									...prev,
									groups: true,
									projects: false,
								}))
							}
						>
							Mis Grupos
						</button>
					</div>
					<Link to='/project-form' className={styles.link}>Crear Proyecto</Link>
					{section.projects && <MyProjects userId={userId} />}
					{section.groups && <h4>Grupos</h4>}
				</section>
			</main>
		</>
	);
};
