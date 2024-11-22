import React, { useEffect, useState } from 'react';
import Categories from "./components/Categories";
import Cards from "./components/Cards";
import Header from "./components/Header";
import Pagination from './components/Pagination';  // 페이지네이션 컴포넌트 추가
import './App.css';
import './styles/global.css';

function App() {
  const [categories, setCategories] = useState([]);
  const [allCardsData, setAllCardsData] = useState([]); // 모든 카드 데이터를 저장
  const [filteredCardsData, setFilteredCardsData] = useState([]); // 필터링된 카드 데이터를 저장
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const [currentPage, setCurrentPage] = useState(1);  // 현재 페이지 상태
  const pageSize = 8;  // 한 페이지에 표시할 카드 개수
  const [totalCards, setTotalCards] = useState(0);  // 전체 카드 수

  useEffect(() => {
    // 카테고리 목록을 가져옴
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://server.yoyakzom.com/summary/category-group');
        if (!response.ok) {
          throw new Error('카테고리를 가져오지 못했습니다.');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      }
    };

    // 모든 카드 데이터를 가져옴
    const fetchAllCards = async () => {
      try {
        const response = await fetch('https://server.yoyakzom.com/summary');
        if (!response.ok) {
          throw new Error('카드 데이터를 가져오지 못했습니다.');
        }
        const data = await response.json();
        setAllCardsData(data);
        setFilteredCardsData(data); // 초기에는 모든 카드를 표시
        setTotalCards(data.length); // 전체 카드 수 설정
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCategories();
    fetchAllCards();
  }, []);

  // 특정 카테고리 버튼을 클릭할 때 호출되는 함수
  const handleCategoryClick = async (category) => {
    try {
      setSelectedCategory(category);
      const response = await fetch(`https://server.yoyakzom.com/summary/category?category=${category}`);
      if (!response.ok) {
        throw new Error('카테고리 데이터를 가져오지 못했습니다.');
      }
      const data = await response.json();
      setFilteredCardsData(data); // 선택된 카테고리의 데이터를 필터링된 카드로 설정
      setTotalCards(data.length); // 필터링된 카드의 총 개수 설정
    } catch (error) {
      setError(error.message);
    }
  };

  // 검색어 변경 시 호출되는 함수
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterCards(e.target.value);
  };

  // 검색어로 카드 데이터를 필터링하는 함수
  const filterCards = (query) => {
    const filtered = allCardsData.filter((card) => {
      const inSummary = card.summary.toLowerCase().includes(query.toLowerCase());
      const inSelectedCategory = selectedCategory
        ? card.category === selectedCategory
        : true; // 선택된 카테고리에서 필터링, 없으면 전체 검색
      return inSummary && inSelectedCategory;
    });
    setFilteredCardsData(filtered);
    setTotalCards(filtered.length); // 필터링된 카드 수 갱신
  };

  // 검색어로 필터링하는 함수 (검색 버튼 클릭 시 사용)
  const handleSearch = (query) => {
    filterCards(query);
  };

  // 페이지가 변경될 때 호출되는 함수
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 카드 데이터에서 현재 페이지에 맞는 데이터만 반환하는 함수
  const getCurrentPageCards = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredCardsData.slice(startIndex, endIndex);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      {/* Header 컴포넌트 사용, 검색 상태와 이벤트 핸들러를 props로 전달 */}
      <Header
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        onSearch={handleSearch}
      />

      {/* Main Content Section */}
      <Categories categories={categories} onCategoryClick={handleCategoryClick} />
      <div>
        {selectedCategory && <h2>선택된 카테고리: {selectedCategory}</h2>}
        <Cards items={getCurrentPageCards()} />
      </div>

      {/* 페이지네이션 컴포넌트 추가 */}
      <Pagination
        total={totalCards}
        pageSize={pageSize}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default App;
