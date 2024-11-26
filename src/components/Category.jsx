import PropTypes from 'prop-types';
import '../styles/nav.css';

export default function Category({ category, count, handleCategoryClick, setCurrentPage }) {
    return (
        <div 
            className="nav-item"
            onClick={() => {
                handleCategoryClick(category);
                setCurrentPage(1);
            }}
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