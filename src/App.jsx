import React, { useEffect, useState } from 'react';
import Categories from "./components/Categories";
import Cards from "./components/Cards";
import Header from "./components/Header";
import Pagination from './components/Pagination';  
import Summary from './components/Summary';  
import './App.css';
import './styles/global.css';

function App() {
  const [categories, setCategories] = useState([]); // 카테고리 목록 저장
  const [allCardsData, setAllCardsData] = useState([]); // 모든 카드 데이터 저장
  const [filteredCardsData, setFilteredCardsData] = useState([]); // 필터링된 카드 데이터 저장
  const [error, setError] = useState(null); // 에러 메시지 저장
  const [selectedCategory, setSelectedCategory] = useState(''); // 선택된 카테고리 저장
  const [searchQuery, setSearchQuery] = useState(''); // 검색어 저장
  const [selectedCard, setSelectedCard] = useState(null); // 선택된 카드의 상세보기 저장

  // 페이지네이션 상태
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호 저장
  const pageSize = 12;  // 페이지당 카드 개수 설정
  const [totalCards, setTotalCards] = useState(0); // 전체 카드 개수 저장

  // 첫 로드 시 카테고리와 카드 데이터 가져오기
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://server.yoyakzom.com/summary/category-group');
        if (!response.ok) {
          throw new Error('카테고리를 가져오지 못했습니다.');
        }
        const data = await response.json();
        setCategories(data); // 서버에서 받은 카테고리 데이터를 상태에 저장
      } catch (error) {
        setError(error.message); // 에러 발생 시 에러 메시지 저장
      }
    };

    const fetchAllCards = async () => {
      try {
        const response = await fetch('https://server.yoyakzom.com/summary');
        if (!response.ok) {
          throw new Error('카드 데이터를 가져오지 못했습니다.');
        }
        const data = await response.json();
        setAllCardsData(data); // 모든 카드 데이터를 상태에 저장
        setFilteredCardsData(data); // 필터링된 카드 데이터 초기화 (전체로 설정)
        setTotalCards(data.length); // 전체 카드 개수를 상태에 저장
      } catch (error) {
        setError(error.message); // 에러 발생 시 에러 메시지 저장
      }
    };

    fetchCategories(); // 카테고리 데이터를 가져오는 함수 호출
    fetchAllCards(); // 카드 데이터를 가져오는 함수 호출
  }, []);

  // 카테고리 클릭 시 해당 카테고리 데이터 필터링
  const handleCategoryClick = async (category) => {
    try {
      setSelectedCategory(category); // 선택된 카테고리 상태 업데이트
      const response = await fetch(`https://server.yoyakzom.com/summary/category?category=${category}`);
      if (!response.ok) {
        throw new Error('카테고리 데이터를 가져오지 못했습니다.');
      }
      const data = await response.json();
      setFilteredCardsData(data); // 선택된 카테고리의 카드 데이터로 상태 업데이트
      setTotalCards(data.length); // 선택된 카테고리의 카드 개수를 상태에 저장
    } catch (error) {
      setError(error.message); // 에러 발생 시 에러 메시지 저장
    }
  };

  // 검색어 입력 시 검색어 상태 업데이트 및 카드 필터링
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value); // 입력된 검색어를 상태에 저장
    filterCards(e.target.value); // 검색어에 따라 카드 데이터 필터링
  };

  // 검색어 및 선택된 카테고리에 따라 카드 데이터를 필터링
  const filterCards = (query) => {
    const filtered = allCardsData.filter((card) => {
      const inSummary = card.summary.toLowerCase().includes(query.toLowerCase()); // 카드의 요약에 검색어가 포함되어 있는지 확인
      const inSelectedCategory = selectedCategory
        ? card.category === selectedCategory // 선택된 카테고리에 해당하는지 확인
        : true;
      return inSummary && inSelectedCategory; // 검색어와 카테고리 조건을 모두 만족하는 카드 반환
    });
    setFilteredCardsData(filtered); // 필터링된 카드 데이터를 상태에 저장
    setTotalCards(filtered.length); // 필터링된 카드 개수를 상태에 저장
  };

  // 검색 버튼 클릭 시 카드 데이터 필터링
  const handleSearch = (query) => {
    filterCards(query); // 검색어에 따라 카드 데이터 필터링
  };

  // 페이지 변경 시 현재 페이지 번호 업데이트
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber); // 선택된 페이지 번호로 상태 업데이트
  };

  // 현재 페이지에 해당하는 카드 데이터를 가져오기
  const getCurrentPageCards = () => {
    const startIndex = (currentPage - 1) * pageSize; // 페이지 시작 인덱스 계산
    const endIndex = startIndex + pageSize; // 페이지 끝 인덱스 계산
    return filteredCardsData.slice(startIndex, endIndex); // 현재 페이지의 카드 데이터 반환
  };

  // 'More' 버튼 클릭 시 카드 상세보기 상태 업데이트
  const handleMoreClick = (card) => {
    setSelectedCard(card); // 선택된 카드의 상세정보를 상태에 저장
  };

  // 'Back' 버튼 클릭 시 카드 상세보기 종료
  const handleBackClick = () => {
    setSelectedCard(null); // 선택된 카드 상세정보 상태 초기화
  };

  // 에러 발생 시 에러 메시지 표시
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="app-container">
      {/* 헤더 컴포넌트: 검색 기능 */}
      <Header
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        onSearch={handleSearch}
      />
  
      {/* 카테고리 컴포넌트: 카테고리 선택 기능 */}
      <Categories categories={categories} onCategoryClick={handleCategoryClick} />
  
      {/* 카드 목록 또는 상세보기 컴포넌트 */}
      <div className="cards-container">
        {selectedCard ? (
          <Summary
            id={selectedCard.id}
            summary={selectedCard.summary}
            originalText={selectedCard.original_text} 
            createdAt={selectedCard.created_at} 
            viewCount={selectedCard.view_count} 
            onBackClick={handleBackClick}
          />
        ) : (
          <Cards items={getCurrentPageCards()} onMoreClick={handleMoreClick} />
        )}
      </div>
  
      {/* 페이지네이션 컴포넌트 */}
      <footer>
        <Pagination
          total={totalCards}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </footer>
    </div>
  );  
}

export default App;
