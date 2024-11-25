import PropTypes from 'prop-types';
import '../styles/nav.css';

export default function Category({ category, count, handleCategoryClick }) {
    return (
        <div 
            className="nav-item"
            onClick={() => handleCategoryClick(category)}
        >
            {category}
            <span className="count">({count})</span>
        </div>
    )
}

Category.propTypes = {
    category: PropTypes.string.isRequired,
    count: PropTypes.string.isRequired,
}