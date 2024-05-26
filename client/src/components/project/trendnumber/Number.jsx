import PropTypes from 'prop-types';

const Number = ({ trendNumber }) => {
	return (
		<div style={{ marginBlock: '2.2rem 0.8rem' }}>
			<p style={numberStyles}>#{trendNumber}</p>
		</div>
	);
};

const numberStyles = {
	fontSize: '3.5rem',
	fontWeight: '600',
	color: '#BE221F',
};

Number.propTypes = {
	trendNumber: PropTypes.number,
};

export default Number;
