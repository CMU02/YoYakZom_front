import '../styles/summary.css';
import '../styles/summary-content.css';

import SummaryHeader from './SummaryHeader';

export default function Summary({ id, summary, original_text, create_at, view_count, onBackClick }) {
    return (
        <div className='ratioHolder'>
            <div className='summary-container' key={id}>
                <SummaryHeader
                    summary={summary}
                    create_at={create_at}
                    view_count={view_count}
                    onBackClick={onBackClick}  // 뒤로 가기 버튼에 클릭 핸들러 전달
                />
                <div className="summary-content">
                    {original_text}
                </div>
            </div>
        </div>
    );
}
