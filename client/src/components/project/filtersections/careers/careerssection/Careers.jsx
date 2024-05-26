// Dependencies
import { useQuery } from 'react-query';
// Component
import CareerCard from '../../../../careers/careercard/CareerCard';
import { NothingToSee } from '../../../../utils/NothingToSee/NothingToSee';
import PacmanLoader from 'react-spinners/PacmanLoader';
// Request

export const Careers = () => {
	const careers = [
		{ id: 1, name: 'Ingeniería de Sistemas' },
		{ id: 2, name: 'Ingeniería Industrial' },
		{ id: 3, name: 'Derecho' },
		{ id: 4, name: 'Administración de Empresas' },
		{ id: 5, name: 'Medicina' },
		{ id: 6, name: 'Arquitectura' },
		{ id: 7, name: 'Psicología' },
		{ id: 8, name: 'Comunicación Social' },
		{ id: 9, name: 'Diseño Gráfico' },
		{ id: 10, name: 'Economía' },
		{ id: 11, name: 'Educación' },
		{ id: 12, name: 'Ingeniería Civil' },
		{ id: 13, name: 'Marketing' },
		{ id: 14, name: 'Biología' },
		{ id: 15, name: 'Departamento de Artes' },
		{ id: 16, name: 'Contabilidad' },
	];

	return (
		<section style={sectionStyle} alt='section'>
			{careers.length === 0 && <NothingToSee />}
			{careers.map((career) => (
				<CareerCard career={career} key={career.id} />
			))}
		</section>
	);
};

const sectionStyle = {
	width: '80%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	gap: '2rem',
	margin: '3rem auto',
};
