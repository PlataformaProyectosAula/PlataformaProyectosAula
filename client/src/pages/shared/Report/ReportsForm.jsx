// Styles
import styles from './ReportsForm.module.scss';
// Request
import { createReport } from '../../../api/reportsApi';
// Components
import { Nav as AdminNav } from '../../../components/layout/nav/AdminNav/Nav';
import { Nav as StudentNav } from '../../../components/layout/nav/StudentNav/Nav';
import { Nav as ProfessorNav } from '../../../components/layout/nav/ProfessorNav/Nav';
import { SuccessPopUp } from '../../../components/utils/success/SuccessPopUp';
import { ErrorPopUp } from '../../../components/utils/error/ErrorPopUp';
import { ValidationError } from '../../../components/utils/validation/ValidationError';
// Dependencies
import BarLoader from 'react-spinners/BarLoader';
import { useMutation } from 'react-query';
import { useForm } from 'react-hook-form';

export const ReportsForm = () => {
	const role = localStorage.getItem('role');
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm();

	const createReportMutation = useMutation(createReport);

	const handleSubmitReport = async (data) => {
		console.log(data);
		try {
			await createReportMutation.mutateAsync(data, {
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
			{createReportMutation.isError && (
				<ErrorPopUp message={createReportMutation.error} />
			)}
			{createReportMutation.isSuccess && (
				<SuccessPopUp message='El Reporte Fue Enviado' />
			)}
			<main className={styles.main} onSubmit={handleSubmit(handleSubmitReport)}>
				{role === '1' && <AdminNav />}
				{role === '2' && <StudentNav />}
				{role === '3' && <ProfessorNav />}
				<form className={styles.form}>
					<h1 className={styles.form__title}>Haz tu reporte</h1>
					<div>
						<label htmlFor='title' className={styles.form__label}>
							Titulo del reporte:
						</label>
						<input
							id='title'
							rows='10'
							className={styles.form__input}
							{...register('title', {
								required: {
									value: true,
									message: 'El titulo es requerido',
								},
							})}
						/>
						{errors.description && (
							<ValidationError message={errors.description.message} />
						)}
					</div>
					<div>
						<label htmlFor='description' className={styles.form__label}>
							Descrpción del reporte:
						</label>
						<textarea
							id='description'
							rows='10'
							className={styles.form__textarea}
							{...register('description', {
								required: {
									value: true,
									message: 'La descrpción es requerida',
								},
							})}
						></textarea>
						{errors.description && (
							<ValidationError message={errors.description.message} />
						)}
					</div>
					<div>
						<label htmlFor='evidence' className={styles.form__label}>
							Evidencias del plagio
						</label>
						<input
							type='file'
							id='evidence'
							{...register('file', {
								required: { value: true, message: 'El archivo es requerido' },
							})}
							className={styles.form__input}
						/>
						{errors.file && <ValidationError message={errors.file.message} />}
					</div>
					<button type='submit' className={styles.form__button}>
						Enviar
					</button>
					{createReportMutation.isLoading && (
						<div data-testid='loader-container' className={styles.form__loader}>
							<BarLoader
								color='#0A84F4'
								height={7}
								width={470}
								loading={createReportMutation.isLoading}
							/>
						</div>
					)}
				</form>
			</main>
		</>
	);
};
