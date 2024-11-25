import '../styles/summary-header.css';

export default function SummaryHeader({ summary, created_at, view_count, original_text, onBackClick }) {
    return (
        <div className="summary-header">
            <div className='summary-back' onClick={onBackClick}>
                <img src="/icons/left_arrow.svg" alt="뒤로가기" />
            </div>
            <div className="summary-title">
                <h3>{summary}</h3>
            </div>
            <hr className='summary-hr' />
            <div className="summary-original-text">
                <p>{original_text}</p>  {/* original_text로 수정 */}
            </div>
            <div className="summary-info">
                <div className="summary-create_at">
                    <img src="/icons/calendar.svg" alt="생성날짜" />
                    <p>{created_at}</p>  {/* created_at으로 수정 */}
                </div>
                <hr className='summary-info-hr' />
                <div className="summary-watch">
                    <img src="/icons/watch.svg" alt="조회수" />
                    <p>{view_count}</p>  {/* view_count으로 수정 */}
                </div>
            </div>
        </div>
    );
}
