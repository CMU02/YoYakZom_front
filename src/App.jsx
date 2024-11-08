import React, { useState, useEffect } from 'react';
import './App.css'; 

const mockData = [
  { id: 1, category: 'IT/하드웨어', title: 'Contrary to popular belief', date: '2024.10.24', views: 1024, content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { id: 2, category: '자동차', title: 'Car technologies in 2024', date: '2024.10.24', views: 800, content: 'Phasellus non nisl sit amet elit tristique tristique.' },
  { id: 3, category: '게임/모바일', title: 'Top 10 mobile games', date: '2024.10.24', views: 500, content: 'Proin eget tortor risus.' },
  // 더 많은 목업 데이터 추가
];

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState(''); // 카테고리 상태
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 상태
  const [data, setData] = useState(mockData); // 데이터 상태
  const [error, setError] = useState(null); // 에러 상태

  // 카테고리 버튼 클릭 시 상태 변경
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // 검색어 입력 시 상태 변경
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // API 호출 및 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      setError(null);

      // API URL 결정
      const url = selectedCategory
        ? `https://server.yoyakzom.com/summary/category?category=${selectedCategory}`
        : 'https://server.yoyakzom.com/summary'; // 카테고리 선택 없으면 전체 목록

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('API 호출 실패');
        }
        const result = await response.json();
        setData(result); // 데이터 상태 업데이트
      } catch (error) {
        setError(error.message); // 에러 상태 업데이트
      } 
    };

    fetchData();
  }, [selectedCategory]); // selectedCategory가 변경될 때마다 API 호출

  // 데이터 필터링 (검색 기능)
  const filteredData = data.filter(item => {
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    const matchesSearch = searchQuery ? item.title.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="app-container">
      <header className="header">
        <div className="title"><a href="#">요약좀</a></div>
        <div className="search-container">
          <div className="SearchLabel">검색하기</div>
          <div className="search-box">
            <input 
              type="text" 
              placeholder="검색" 
              value={searchQuery} 
              onChange={handleSearchChange} 
            />
            <button className="SearchBtn">
              <img src="Search-icon.png" alt="Search" className="search-icon" />
            </button>
          </div>
        </div>
        <div className="service-introduction"><a href="#">서비스 소개 글</a></div>
      </header>

      <nav className="category-nav">
        <button onClick={() => handleCategoryClick('IT')}>IT/하드웨어</button>
        <button onClick={() => handleCategoryClick('Car')}>자동차</button>
        <button onClick={() => handleCategoryClick('Game')}>게임/모바일</button>
        <button onClick={() => handleCategoryClick('News')}>뉴스</button>
        <button onClick={() => handleCategoryClick('Product')}>가전제품/TV</button>
        <button onClick={() => handleCategoryClick('Information')}>정보</button>
        <button onClick={() => handleCategoryClick('Food')}>푸드</button>
        <button onClick={() => handleCategoryClick('Health')}>건강</button>
      </nav>

      <div className="card-container">
        {error && <p>Error: {error}</p>}
        {!error && filteredData.map(item => (
          <div className="card" key={item.id}>
            <div className="card-header">{item.category}</div>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
            <div className="card-footer">
              <span>{item.date}</span>
              <span>{item.views} views</span>
              <button>More</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
