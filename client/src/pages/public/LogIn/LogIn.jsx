// Styles
import styles from './LogIn.module.scss';
// Dependencies
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
// Request
import { loginRequest } from '../../../api/authApi';
// Components
import { ValidationError } from '../../../components/utils/validation/ValidationError';
import { ErrorPopUp } from '../../../components/utils/error/ErrorPopUp';
import BarLoader from 'react-spinners/BarLoader';

export const LogIn = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const navigate = useNavigate();

	const loginMutation = useMutation(loginRequest);

	const handleLogIn = async (data) => {
		const userData = {
			data: {
				type: 'user',
				attributes: {
					email: data.email,
					password: data.password,
				},
			},
		};

		const handleUserRedirection = (role) => {
			if (role === 1) {
				navigate('/user-management');
			} else if (role === 2) {
				navigate('/indexStudent');
			} else if (role === 3) {
				navigate('/indexProfessor');
			}
		};

		try {
			await loginMutation.mutateAsync(userData, {
				onSuccess: (mutationResult) => {
					reset();
					const role = mutationResult.data.attributes.role_id;
					//Save the user token and role in localstorage
					localStorage.setItem('role', role);
					localStorage.setItem('token', mutationResult.data.attributes.token);
					localStorage.setItem('userId', mutationResult.data.id);
					console.log(localStorage.getItem('role'));
					console.log(localStorage.getItem('token'));
					console.log(localStorage.getItem('userId'));
					handleUserRedirection(role);
				},
			});
		} catch (error) {
			console.error(error);
		}
	};
	return (
		<>
			{loginMutation.isError && !loginMutation.error.message.includes('401') ? (
				<ErrorPopUp message={loginMutation.error.message} role='alert' />
			) : (
				''
			)}
			<main className={styles.main}>
				<div className={styles.container}>
					<h2 className={styles.container__title}>¡Bienvenido otra vez!</h2>
					<p className={styles.container__text}>
						Estamos encantados de tenerte de regreso. Por favor, inicia sesión
						para acceder a tu cuenta y continuar explorando todo lo que tenemos
						para ofrecerte.
					</p>
				</div>
				<form
					className={styles.form}
					role='form'
					onSubmit={handleSubmit(handleLogIn)}
				>
					<h3 className={styles.form__title}>Inicia Sesion</h3>
					<label htmlFor='email' className={styles.form__label}>
						Email
					</label>
					<input
						type='text'
						id='email'
						className={styles.form__input}
						{...register('email', {
							required: {
								value: true,
								message: 'Ingrese el email para continuar',
							},
							pattern: {
								value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
								message: 'Por favor, ingresar un email valido',
							},
						})}
					/>
					{errors.email && <ValidationError message={errors.email.message} />}
					<label htmlFor='password' className={styles.form__label}>
						Contraseña
					</label>
					<input
						type='password'
						id='password'
						className={styles.form__input}
						{...register('password', {
							required: {
								value: true,
								message: 'Ingrese la contraseña para continuar',
							},
						})}
					/>
					{errors.password && (
						<ValidationError message={errors.password.message} />
					)}
					{loginMutation.error &&
					loginMutation.error.message &&
					loginMutation.error.message.includes('401') ? (
						<ValidationError message='Correo o contraseña incorrectos' />
					) : (
						''
					)}
					<a className={styles.form__link}>¿Olvidaste tu contraseña?</a>
					<input
						type='submit'
						value='Iniciar Sesion'
						className={styles.form__button}
						role='button'
					/>
					<p>
						¿No tienes cuenta?{' '}
						<Link className={styles.form__linkBlue} to='/register' role='link'>
							Registrate
						</Link>
					</p>

					<div data-testid='loader-container' className={styles.form__loader}>
						{loginMutation.isLoading && (
							<BarLoader
								color='#0A84F4'
								height={7}
								width={470}
								loading={loginMutation.isLoading}
							/>
						)}
					</div>
				</form>
			</main>
		</>
	);
};
