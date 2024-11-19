import PropTypes from 'prop-types';
import Category from './Category';
import '../styles/nav.css';

export default function Categories({ categories }) {
    return (
        <>
            <nav className='nav-container'>
                {
                    categories.map(({category, count}) => {
                        return (
                            <Category category={category} count={count} key={category}/>
                        )
                    })
                }
            </nav>
        </>
    )
}

Categories.propTypes = {
    categories: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
    })).isRequired,
};       