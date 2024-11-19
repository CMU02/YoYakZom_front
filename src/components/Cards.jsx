import PropTypes from 'prop-types';
import Card from './Card';
import "../styles/cards.css";

export default function Cards({summaryList}) {
    return (
        <>
            <div className='cards-container'>
                {
                    summaryList.map(({id, category, summary, original_text, created_at, view_count}) => {
                        return <Card 
                            key={id} 
                            category={category}
                            summary={summary}
                            original_text={original_text}
                            created_at={created_at}
                            view_count={view_count} 
                        />
                    })
                }
            </div>
        </>
    );
}

Cards.propTypes = {
    summaryList: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
        summary: PropTypes.string.isRequired,
        original_text: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        view_count: PropTypes.number.isRequired,
    })).isRequired,
}