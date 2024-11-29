import PropTypes from 'prop-types';
import Category from './Category';
import '../styles/nav.css';

export default function Categories(
    { 
        categories, 
        handleCategoryClick, 
        selectedSummary, 
        setCurrentPage,
        searchCloseHandler
    }
) {
    return (
        <>
            <nav className={!selectedSummary ? 'nav-container' : 'nav-container-summary-active'}>
                {
                    categories.map(({category, count}) => {
                        return (
                            <Category
                                category={category} 
                                count={count} 
                                key={category}
                                handleCategoryClick={handleCategoryClick}
                                setCurrentPage={setCurrentPage}
                                searchCloseHandler={searchCloseHandler}
                            />
                        )
                    })
                }
            </nav>
        </>
    )
}

Categories.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        category: PropTypes.string.isRequired,
        count: PropTypes.string.isRequired,
    })).isRequired,
    selectedSummary: PropTypes.bool.isRequired,
};       