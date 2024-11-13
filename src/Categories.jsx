import React from 'react';

function Categories({ onCategorySelect }) {
  const categories = ['IT', '자동차', '영화/드라마', '뉴스', '기술', '주식', '일반'];

  return (
    <div className="categories">
      {categories.map((category) => (
        <button 
          key={category} 
          onClick={() => onCategorySelect(category)}
          className="category-button"
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default Categories;
