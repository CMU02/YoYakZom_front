import PropTypes from 'prop-types';
import '../styles/nav.css';

export default function Category({ category, count }) {
    return (
        <div className="nav-item">
            {category}
            <span className="count">({count})</span>
        </div>
    )
}

Category.propTypes = {
    category: PropTypes.string.isRequired,
    count: PropTypes.number.isRequired,
}