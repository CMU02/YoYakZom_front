import '../styles/summary.css';
import '../styles/summary-content.css';

import SummaryHeader from './SummaryHeader';

export default function Summary({id, summary, original_text, create_at, view_count}) {
    return (
        <div className='summary-container' key={id}>
            <SummaryHeader
                summary={summary}
                create_at={create_at}
                view_count={view_count}
            />
            <div className="summary-content">
                {original_text}
            </div>
        </div>
    );
}