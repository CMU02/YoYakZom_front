import '../styles/summary-header.css';

export default function SummaryHeader() {
    return (
        <div className="summary-header">
                <div className='summary-back'>
                    <img src="/icons/left_arrow.svg" alt="뒤로가기" />
                </div>
                <div className="summary-title">
                    <h3>
1. 한강 작가의 첫 소설집인 ‘여수의 사랑’은 젊은 이들의 상실과 방황을 단정한 문체로 풀어냈다.
2. 소설집에는 여수를 배경으로 한 이야기들이 담겨 있으며, 작품에는 젋은이들의 상실과 결핍이 자주 나타난다.
3. 작가는 ‘여수의 사랑’을 시작으로 자신의 아버지 세대가 살았던 어둡고 까다로운 세계를 다루며 대중 문화와 달리 깊은 내면을 탐구했다.
</h3>
                </div>
                <hr className='summary-hr' />
                <div className="summary-info">
                    <div className="summary-create_at">
                        <img src="/icons/calendar.svg" alt="생성날짜" />
                        <p>2021-07-01</p>
                    </div>
                    <hr className='summary-info-hr' />
                    <div className="summary-watch">
                        <img src="/icons/watch.svg" alt="조회수" />
                        <p>100</p>
                    </div>
                </div>
            </div>
    )
}