// Styles
import styles from './UsersList.module.scss';
// Dependencies
import { useQuery } from 'react-query';
import ClipLoader from 'react-spinners/ClipLoader';
import { useContext, useEffect, useState } from 'react';
// Context
import { WarningContext } from '../../../context/WarningContext';
//Component
import { UserCard } from '../usercard/UserCard';
import { NothingToSee } from '../../utils/NothingToSee/NothingToSee';
// Requests
import { getUsers, filterUsers } from '../../../api/usersApi';

export const UsersList = () => {
	const { setVisible, visible } = useContext(WarningContext);
	const [filter, setFilter] = useState({ input: '', userState: '', role: '' });
	const [pages, setPages] = useState({
		first: '',
		last: '',
		next: '',
		prev: '',
	});
	const [page, setPage] = useState('/?page=1');

	const handleInputOnChange = (e) => {
		const { name, value } = e.target;
		setFilter((prev) => ({ ...prev, [name]: value }));
	};

	const userFilter = useQuery(
		['filter', filter.input, filter.userState, filter.role],
		() => filterUsers(filter, page),
		{
			onSuccess: (filterData) => {
				if (filterData && filterData.pages) {
					console.log(filterData.pages);
					setPages((prevPages) => ({
						...prevPages,
						first: filterData.pages.first,
						last: filterData.pages.last,
						next: filterData.pages.next,
						prev: filterData.pages.prev,
					}));
				}
				console.log(filterData.pages);
			},
		},
		{ refetchOnWindowFocus: false },
		{ refetchInterval: 10000, staleTime: 30000 },
	);

	const getUsersData = useQuery(['users', page], () => getUsers(page), {
		onSuccess: (data) => {
			if (data && data.pages) {
				setPages((prevPages) => ({
					...prevPages,
					first: data.pages.first,
					last: data.pages.last,
					next: data.pages.next,
					prev: data.pages.prev,
				}));
			}
		},
		onError: () => setVisible((prev) => ({ ...prev, listUsersError: true })),
	});

	useEffect(() => {
		if (
			filter.input !== '' ||
			filter.userState !== '' ||
			filter.userState !== ''
		) {
			userFilter.refetch();
		}
	}, [filter.input, filter.userState, filter.role]);

	useEffect(() => {
		getUsersData.refetch();
	}, [page || getUsersData.data]);

	const renderData = () => {
		if (userFilter.isLoading || getUsersData.isLoading) {
			return (
				<div className={styles.section__loader} role='progressbar'>
					<ClipLoader
						color='#0A84F4'
						size={40}
						cssOverride={{ alignSelf: 'center' }}
					/>
				</div>
			);
		}

		if (filter.input !== '' || filter.role !== '' || filter.userState !== '') {
			if (userFilter.data !== undefined && userFilter.data !== 204) {
				return userFilter.data.data.map((user) => (
					<UserCard user={user} key={user.id} />
				));
			}
		} else {
			if (getUsersData.data.data && Array.isArray(getUsersData.data.data)) {
				return getUsersData.data.data.map((user) => (
					<UserCard user={user} page={page} key={user.id} />
				));
			}
		}
		return <NothingToSee />;
	};

	return (
		<section className={styles.section} role='main'>
			<div className={styles.section__filter}>
				<form className={styles.form}>
					<input
						type='text'
						name='input'
						className={styles.form__input}
						onChange={(e) => {
							handleInputOnChange(e);
						}}
					/>
					<select
						className={styles.form__input}
						name='role'
						value={filter.input === '' && ''}
						onChange={(e) => {
							handleInputOnChange(e);
						}}
					>
						<option value='*'>Todos</option>
						<option value='2'>Estudiante</option>
						<option value='3'>Profesor</option>
					</select>
					<select
						className={styles.form__input}
						name='userState'
						value={filter.input === '' && ''}
						onChange={(e) => {
							handleInputOnChange(e);
						}}
					>
						<option value='*'>Todos</option>
						<option value='1'>Activos</option>
						<option value='0'>Desactivos</option>
					</select>
					{/* <button type='submit' className={styles.form__button}>
						<FaMagnifyingGlass />
					</button> */}
				</form>
			</div>
			<div role='article' className={styles.section__cardContainer}>
				{renderData()}
			</div>
			{getUsersData.isLoading === false && userFilter.isLoading === false && (
				<div className={styles.section__filter}>
					<button type='button' onClick={() => setPage(pages.first)}>
						Primera
					</button>
					<button
						type='button'
						onClick={() => setPage(pages.prev)}
						disabled={pages.prev === null ? true : false}
					>
						Previa
					</button>
					<button
						type='button'
						onClick={() => setPage(pages.next)}
						disabled={pages.next === null ? true : false}
					>
						Siguiente
					</button>
					<button type='button' onClick={() => setPage(pages.last)}>
						Ultima
					</button>
				</div>
			)}
		</section>
	);
};
