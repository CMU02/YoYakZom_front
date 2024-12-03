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
            <nav className={!selectedSummary ? 'category-container' : 'category-summary-active'}>
                <div className='nav-container'>
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
                </div>
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