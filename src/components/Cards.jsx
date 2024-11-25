import React from 'react';
import Card from './Card';
import '../styles/Card.css';

export default function Cards({ items, onMoreClick }) {
  // 날짜 포맷 함수
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 1을 더해줌
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <div className="cards-container">
      <div className="cards-list">
        {items.map((item, index) => (
          <Card
            key={index}
            category={item.category}
            summary={item.summary}
            original_text={item.original_text}  
            created_at={formatDate(item.created_at)} 
            view_count={item.view_count}  
            onMoreClick={onMoreClick} 
          />
        ))}
      </div>
    </div>
  );
}
