import '../styles/summary.css';
import '../styles/summary-content.css';

import SummaryHeader from './SummaryHeader';

export default function Summary({ selectedSummaryData, handleBackClick }) {
    const { id, summary, original_text, create_at, view_count } = selectedSummaryData;

    return (
        <div className='summary-container' key={id}>
            <SummaryHeader
                summary={summary}
                create_at={create_at}
                view_count={view_count}
                handleBackClick={handleBackClick}
            />
            <div className="summary-content">
                {original_text}
            </div>
        </div>
    );
}