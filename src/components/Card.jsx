import '../styles/card.css';
import PropTypes from 'prop-types';

export default function Card({id, category, summary, original_text, created_at, view_count}) {
    return (
        <div className="card-container" key={id}>
            <div className="card-category">
                <p>{category}</p>
            </div>

            <div className="card-summary">
                <h4>{summary}</h4>
            </div>

            <hr className='card-hr' />

            <div className="card-info">
                <div className="card-update_at">
                    <img src="/icons/calendar.svg" alt="생성날짜" />
                    <p>{created_at.substring(0, 10)}</p>
                </div>
                <div className="card-watch">
                    <img src="/icons/watch.svg" alt="조회수" />
                    <p>{view_count}</p>
                </div>
                <div className="card-more">
                    <p>원본 보기</p>
                </div>
            </div>
        </div>
    )
}

Card.propTypes = {
    id: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    original_text: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    view_count: PropTypes.number.isRequired,
}