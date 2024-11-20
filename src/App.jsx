import React, { useEffect, useState } from 'react';
import Categories from "./components/Categories";
import Cards from "./components/Cards";

function App() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [selectedCategoryData, setSelectedCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

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

    fetchCategories();
  }, []);

  // 선택한 카테고리의 데이터를 가져오는 함수
  const handleCategoryClick = async (category) => {
    try {
      setSelectedCategory(category);
      const response = await fetch(`https://server.yoyakzom.com/summary/category?category=${category}`);
      if (!response.ok) {
        throw new Error('카테고리 데이터를 가져오지 못했습니다.');
      }
      const data = await response.json();
      setSelectedCategoryData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>카테고리 필터 예제</h1>
      <Categories categories={categories} onCategoryClick={handleCategoryClick} />
      <div>
        {selectedCategory && (
          <>
            <h2>선택된 카테고리: {selectedCategory}</h2>
            <Cards items={selectedCategoryData} />
          </>
        )}
      </div>
    </div>
  );
}

export default App;
