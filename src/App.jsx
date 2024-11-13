import React, { useState, useMemo } from 'react';
import './App.css';

// 카테고리 목록
const categories = [
  'IT', '경제', '스포츠', '과학', '의료', '여행', '교육', '환경', 
  '사회', '문화', '정치', '패션', '자동차', '음식', '부동산', 
  '기술', '건강', '게임'
];

// 기사에 대한 목업 데이터
const mockData = [
  { id: 1, category: 'IT', title: 'Latest Trends in Tech', content: 'Exploring AI, VR, and blockchain advancements.', date: '2024-11-13', views: 120 },
  { id: 2, category: '경제', title: 'Economy Growth Insights', content: 'Analysis on the economic trends of the year.', date: '2024-11-12', views: 80 },
  { id: 3, category: '스포츠', title: 'Championship Highlights', content: 'Recap of the most exciting games this season.', date: '2024-11-10', views: 150 },
  { id: 4, category: '과학', title: 'Space Exploration Updates', content: 'New missions to Mars and beyond.', date: '2024-11-09', views: 90 },
  { id: 5, category: '여행', title: 'Top Travel Destinations', content: 'The most popular spots for travelers in 2024.', date: '2024-11-08', views: 200 },
  { id: 6, category: '음식', title: 'Popular Cuisines', content: 'Exploring the top food trends this year.', date: '2024-11-07', views: 95 },
  { id: 7, category: '자동차', title: 'Electric Vehicles', content: 'How EVs are changing the automotive landscape.', date: '2024-11-06', views: 110 },
  // 필요한 만큼 더 많은 목업 데이터를 추가할 수 있습니다
];

const App = () => {
  // 선택된 카테고리 상태
  const [selectedCategory, setSelectedCategory] = useState('');
  // 검색어 상태
  const [searchQuery, setSearchQuery] = useState('');
  // 현재 표시할 데이터 (목업 데이터로 초기화)
  const [data, setData] = useState(mockData);
  // 오류 상태 (현재 사용되지 않음)
  const [error] = useState(null);

  // 데이터에 기반하여 각 카테고리의 개수를 계산하는 함수
  const categoryCounts = useMemo(() => {
    return data.reduce((acc, item) => {
      acc[item.category] = (acc[item.category] || 0) + 1;
      return acc;
    }, {});
  }, [data]);

  // 카테고리 클릭 시 선택된 카테고리 업데이트
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  // 검색어 입력 시 상태 업데이트
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // 선택된 카테고리와 검색어에 맞게 데이터를 필터링
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
        <div className="category-scroll">
          {categories.map((category) => (
            <button 
              key={category} 
              onClick={() => handleCategoryClick(category)}
            >
              {/* 각 카테고리 버튼에 해당 카테고리 이름과 데이터에 기반한 개수를 표시 */}
              {category} ({categoryCounts[category] || 0})
            </button>
          ))}
        </div>
      </nav>

      <div className="card-container">
        {/* 오류가 발생한 경우 오류 메시지 출력 */}
        {error && <p>Error: {error}</p>}
        {/* 필터링된 데이터를 카드 형식으로 표시 */}
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
