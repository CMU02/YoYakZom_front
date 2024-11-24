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
            originalText={item.original_text}
            createdAt={formatDate(item.created_at)} // 날짜 포맷 적용
            viewCount={item.view_count}
            onMoreClick={() => onMoreClick(item)}
          />
        ))}
      </div>
    </div>
  );
}
