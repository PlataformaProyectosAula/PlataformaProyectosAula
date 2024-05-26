// Styles
import styles from './CareerCard.module.scss';
// Dependencies
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const CareerCard = ({career}) => {
  return (
    <div className={styles.card}>
        <p className={styles.card__text}>{career.name}</p>
        <Link to={`/projects-career/${career.name}`} className={styles.card__link}>Ver</Link>
    </div>
  )
}

CareerCard.propTypes = {
    career: PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string,
    })
}

export default CareerCard