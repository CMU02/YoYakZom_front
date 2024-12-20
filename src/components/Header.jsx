import '../styles/Header.css';


export default function Header({ 
    searchQuery,
    setSearchQuery,
    searchClose,
    setSearchClose, 
    searchSummaryList 
}) {
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            searchSummaryList(e.target.value);
        }
    }

    return (
        <header>
            <div className='title'>
                <h1>요약좀</h1>
            </div>
            <div className='search-container'>
                <div className='search-title'>
                    <p>검색하기</p>
                </div>
                <div className='search-field'>
                    <div className={!searchClose ? 'search-bar' : 'search-bar-active'}>
                        <input 
                            type="text" 
                            placeholder="원하는 키워드를 입력하세요"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                setSearchClose(true);
                            }}
                            onKeyDown={handleKeyDown}
                        />
                        {
                            searchClose && 
                            <div 
                                className='search-close-btn'
                                onClick={() => {
                                    setSearchQuery('');
                                    setSearchClose(false);
                                }}
                            >
                                <img src='/icons/close.svg' alt='닫기버튼'/>
                            </div>
                        }
                    </div>
                    
                    <div 
                        className='search-btn'
                        onClick={() => searchSummaryList(searchQuery)}
                    >
                        <img src='/icons/search_icon.svg' alt='검색버튼'/>
                    </div>
                    <div className='add-extension'>
                        <a href='https://chromewebstore.google.com/detail/3%EC%A4%84%EC%9A%94%EC%95%BD/dedncngegghidipajdpiaioklindkgke?hl=ko'>확장프로그램 3줄요약 추가하러가기</a>
                    </div>
                </div>
            </div>
        
            <div className='info'>
                <p>정보 과부하 속에서 핵심 내용을 빠르게 파악하기 어려운 시대입니다. &apos;3줄요약&apos; 서비스는 이러한 문제를 해결하기 위해 설계된 솔루션으로, 방대한 글이나 자료를 3줄로 간략하게 요약하여 사용자들이 중요한 정보를 놓치지 않고 효율적으로 습득할 수 있도록 돕습니다.</p> 
            </div>
        </header>
    );
}