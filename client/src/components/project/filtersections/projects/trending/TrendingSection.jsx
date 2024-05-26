// Request
import PacmanLoader from 'react-spinners/PacmanLoader';
import { getTrendingProjectsRequest } from '../../../../../api/projectsApi';
// Components
import { ProjectCard } from '../../../projectcard/ProjectCard';
import Number from '../../../trendnumber/Number';
// Dependencies
import { useQuery } from 'react-query';

export const TrendingSection = () => {
	const { isLoading, data } = useQuery(
		['trending-projects'],
		getTrendingProjectsRequest,
		{
			onSuccess: (userData)=>console.log(userData)
		}
	);

	return (
		<div style={sectionStyles}>
			{isLoading && (
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<PacmanLoader color='#004D95' cssOverride={{ alignSelf: 'center' }} />
				</div>
			)}
			{data !== undefined &&
				data.map((project) => (
					<div>
						<Number trendNumber={data.indexOf(project) + 1} />
						<ProjectCard project={project} key={project.id} />
					</div>
				))}
		</div>
	);
};

const sectionStyles = {
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	width: '80%',
	margin: '2rem auto',
};
