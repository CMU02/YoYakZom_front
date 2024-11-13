import './App.css';

function App() {
  // const [selectedCategory, setSelectedCategory] = useState(null); 
  return (
    <div className="app-container">
      {/* 제목과 우측 텍스트 */}
      <div className="header-right">
          <p className="placeholder-text">서비스 소개 글</p> 
      </div>
      <div className="header-left">
        <h1 className="project-title">요약좀</h1>
      </div>
      {/* 검색창과 카테고리 */}
      <header>
        <input type="text" placeholder="검색하기" className="search-bar" />
        <div className="categories">
        </div>
      </header>
    </div>
  );
}

export default App;


