import '../styles/summary-header.css';

export default function SummaryHeader({summary, create_at, view_count}) {
    return (
        <div className="summary-header">
            <div className='summary-back'>
                <img src="/icons/left_arrow.svg" alt="뒤로가기" />
            </div>
            <div className="summary-title">
                <h3>{summary}</h3>
            </div>
            <hr className='summary-hr' />
            <div className="summary-info">
                <div className="summary-create_at">
                    <img src="/icons/calendar.svg" alt="생성날짜" />
                    <p>{create_at}</p>
                </div>
                <hr className='summary-info-hr' />
                <div className="summary-watch">
                    <img src="/icons/watch.svg" alt="조회수" />
                    <p>{view_count}</p>
                </div>
            </div>
        </div>
    )
}