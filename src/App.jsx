import React, { useEffect, useState } from 'react';
import Categories from "./components/Categories";
import Cards from "./components/Cards";
import Header from "./components/Header";
import Pagination from './components/Pagination';  
import Summary from './components/Summary';  
import './App.css';
import './styles/global.css';

function App() {
  const [categories, setCategories] = useState([]);
  const [allCardsData, setAllCardsData] = useState([]);
  const [filteredCardsData, setFilteredCardsData] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);  // 선택된 카드 상태 추가

  const [currentPage, setCurrentPage] = useState(1);  
  const pageSize = 8;  
  const [totalCards, setTotalCards] = useState(0);

  useEffect(() => {
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

    const fetchAllCards = async () => {
      try {
        const response = await fetch('https://server.yoyakzom.com/summary');
        if (!response.ok) {
          throw new Error('카드 데이터를 가져오지 못했습니다.');
        }
        const data = await response.json();
        setAllCardsData(data);
        setFilteredCardsData(data); 
        setTotalCards(data.length); 
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCategories();
    fetchAllCards();
  }, []);

  const handleCategoryClick = async (category) => {
    try {
      setSelectedCategory(category);
      const response = await fetch(`https://server.yoyakzom.com/summary/category?category=${category}`);
      if (!response.ok) {
        throw new Error('카테고리 데이터를 가져오지 못했습니다.');
      }
      const data = await response.json();
      setFilteredCardsData(data);
      setTotalCards(data.length);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterCards(e.target.value);
  };

  const filterCards = (query) => {
    const filtered = allCardsData.filter((card) => {
      const inSummary = card.summary.toLowerCase().includes(query.toLowerCase());
      const inSelectedCategory = selectedCategory
        ? card.category === selectedCategory
        : true;
      return inSummary && inSelectedCategory;
    });
    setFilteredCardsData(filtered);
    setTotalCards(filtered.length);
  };

  const handleSearch = (query) => {
    filterCards(query);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const getCurrentPageCards = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredCardsData.slice(startIndex, endIndex);
  };

  const handleMoreClick = (card) => {
    setSelectedCard(card);  // 카드 클릭 시 선택된 카드 상태 설정
  };

  const handleBackClick = () => {
    setSelectedCard(null);  // 상세 페이지에서 뒤로 가기 클릭 시 선택된 카드 초기화
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <Header
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        onSearch={handleSearch}
      />

      <Categories categories={categories} onCategoryClick={handleCategoryClick} />
      
      {/* 선택된 카드가 있으면 Summary를 표시 */}
      {selectedCard ? (
        <Summary
          id={selectedCard.id}
          summary={selectedCard.summary}
          original_text={selectedCard.originalText}
          create_at={selectedCard.createAt}
          view_count={selectedCard.viewCount}
          onBackClick={handleBackClick}  // 뒤로 가기 버튼 전달
        />
      ) : (
        <div>
          <Cards items={getCurrentPageCards()} onMoreClick={handleMoreClick} />  {/* onMoreClick 전달 */}
        </div>
      )}

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
