import React from 'react';
import cardData from './data';

const cards = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  title: `Card ${i + 1}`,
  content: 'This is the first card.'
}));

function CardList({ onCardClick, selectedCard }) {
  return (
    <div className={`card-list ${selectedCard ? 'expanded' : ''}`}>
      {cards.map((card) => (
        <div key={card.id} className="card" onClick={() => onCardClick(card)}>
          <h3>{card.title}</h3>
          <p>{card.content}</p>
          <p>{cardData.cardData}</p>
        </div>
      ))}
    </div>
  );
}

export default CardList;
