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
  const [selectedCard, setSelectedCard] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);  
  const pageSize = 12;  
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
    setSelectedCard(card);
  };

  const handleBackClick = () => {
    setSelectedCard(null);
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="app-container">
      <Header
        searchQuery={searchQuery}
        handleSearchChange={handleSearchChange}
        onSearch={handleSearch}
      />
  
      <Categories categories={categories} onCategoryClick={handleCategoryClick} />
  
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
