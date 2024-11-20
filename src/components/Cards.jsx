import React from 'react';
import Card from './Card';
import '../styles/Card.css'; 

export default function Cards({ items }) {
  return (
    <div className="cards-container">
      {items.map((item, index) => (
        <Card
          key={index}
          category={item.category}
          summary={item.summary}
          originalText={item.original_text}
          createdAt={item.created_at}
          viewCount={item.view_count}
        />
      ))}
    </div>
  );
}
