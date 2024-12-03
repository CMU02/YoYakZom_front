import '../styles/Card.css';
import PropTypes from 'prop-types';

export default function Card({id, category, summary, created_at, view_count, handleOriginalTextClick}) {

    const formatWithH4 = (text) => {
        // 요약 문자열을 줄 단위로 나눈 뒤, <h4> 태그로 포맷
        const lines = text.split('\n');
        return lines.map((line, index) => {
            if (line.trim()) {
                return (
                    <h4 key={index}>{line.trim()}</h4>
                );
            }
            return null; // 빈 줄은 무시
        });
    };

    return (
        <div className="card-container" key={id}>
            <div className="card-category">
                <p>{category}</p>
            </div>

            <div className="card-summary">
                {/* <h4>{summary}</h4> */}
                {formatWithH4(summary)}
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
                <div 
                    className="card-more"
                    onClick={() => handleOriginalTextClick(id)}
                >
                    <p>원문 보기</p>
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