import '../styles/summary.css';
import '../styles/summary-content.css';

import SummaryHeader from './SummaryHeader';

export default function Summary({ id, summary, original_text, created_at, view_count, onBackClick }) {
    return (
        <div className='summary-container' key={id}>
            <SummaryHeader
                summary={summary}
                created_at={created_at}  // created_at으로 전달
                view_count={view_count}  // view_count으로 전달
                original_text={original_text}  // original_text로 전달
                onBackClick={onBackClick}  // 뒤로 가기 버튼에 클릭 핸들러 전달
            />
        </div>
    );
}
