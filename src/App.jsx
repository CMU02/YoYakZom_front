import './App.css';
import './styles/global.css';
import './styles/Header.css'

function App() {
  return (
    <>
      <header>
        <div className='title'>
          <h1>요약좀</h1>
        </div>
        <div className='search-container'>
          <div className='search-title'>
            <p>검색하기</p>
          </div>
          <div className='search-bar'>
            <input type="text" placeholder="검색하기"/>
          </div>
          <div className='search-btn'>
            <img src='/icons/search_icon.svg' alt='검색버튼'/>
          </div>
        </div>
        <div className='info'>
          <p>정보 과부하 속에서 핵심 내용을 빠르게 파악하기 어려운 시대입니다. &apos;3줄요약&apos; 서비스는 이러한 문제를 해결하기 위해 설계된 솔루션으로, 방대한 글이나 자료를 3줄로 간략하게 요약하여 사용자들이 중요한 정보를 놓치지 않고 효율적으로 습득할 수 있도록 돕습니다.</p> 
        </div>
      </header>
    </>
  );
}

export default App;


