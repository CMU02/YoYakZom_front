import '../styles/summary.css';
import '../styles/summary-content.css';

import SummaryHeader from './SummaryHeader';

export default function Summary({ selectedSummaryData, handleBackClick }) {
    const { id, summary, original_text, created_at, view_count } = selectedSummaryData;

    return (
        <div className='summary-container' key={id}>
            <div className='summary'>
                <SummaryHeader
                    summary={summary}
                    create_at={created_at.substring(0, 10)}
                    view_count={view_count}
                    handleBackClick={handleBackClick}
                />
                <div className="summary-content">
                    {original_text}
                </div>
            </div>
        </div>
    );
}