// Styles
import styles from './Register.module.scss';
// Dependencies
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
// Request
import { registerRequest } from '../../../api/authApi';
// Components
import { ValidationError } from '../../../components/utils/validation/ValidationError';
import { ErrorPopUp } from '../../../components/utils/error/ErrorPopUp';
import { SuccessPopUp } from '../../../components/utils/success/SuccessPopUp';
import BarLoader from 'react-spinners/BarLoader';

export const Register = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const registerMutation = useMutation(registerRequest);

	const handleRegister = async (data) => {
		const user = {
			data: {
				type: 'user',
				attributes: {
					code: data.code,
					password: data.password,
				},
			},
		};
		try {
			await registerMutation.mutateAsync(user, {
				onSuccess: () => {
					reset();
				},
			});
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<>
			{registerMutation.isError && (
				<ErrorPopUp message={registerMutation.error.message} role='alert' />
			)}
			{registerMutation.isSuccess && (
				<SuccessPopUp message='Se ha registrado exitosamente' role='status' />
			)}
			<main className={styles.main}>
				<form
					className={styles.form}
					role='form'
					onSubmit={handleSubmit(handleRegister)}
				>
					<h3 className={styles.form__title}>Crea una cuenta</h3>
					<div>
						<input
							type='text'
							placeholder='Codigo'
							className={styles.form__input}
							{...register('code', {
								required: {
									value: true,
									message: 'Ingrese el codigo para crear el perfil',
								},
							})}
						/>
						{errors.code && <ValidationError message={errors.code.message} />}
					</div>
					<div>
						<input
							type='password'
							placeholder='Contraseña'
							className={styles.form__input}
							{...register('password', {
								required: {
									value: true,
									message: 'Ingrese la contraseña para crear el perfil',
								},
								minLength: {
									value: 8,
									message: 'La contraseña debe tener al menos 8 digitos',
								},
								maxLength: {
									value: 16,
									message: 'La contraseña debe tener menos de 16 digitos',
								},
							})}
						/>
						{errors.password && (
							<ValidationError message={errors.password.message} />
						)}
					</div>
					<input
						type='submit'
						value='Registrarse'
						className={styles.form__button}
						role='button'
					/>
					<p>
						¿Ya tienes una cuenta?{' '}
						<Link to='/' className={styles.form__link} role='link'>
							Inicia sesion
						</Link>
					</p>
					<div data-testid='loader-container' className={styles.form__loader}>
						{registerMutation.isLoading && (
							<BarLoader
								color='#0A84F4'
								height={7}
								width={470}
								loading={registerMutation.isLoading}
							/>
						)}
					</div>
				</form>
			</main>
		</>
	);
};
