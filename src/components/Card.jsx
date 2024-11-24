import React from 'react';
import '../styles/Card.css';

const truncateText = (text, maxLength = 100) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

export default function Card({ id, category, summary, original_text, created_at, view_count, onMoreClick }) {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-category">{category}</span>
      </div>
      <div className="card-content">
        <h3 className="card-summary">{truncateText(summary)}</h3>
        <hr className="card-divider" />
      </div>
      <div className="card-footer">
        <div className="card-meta">
          <span className="card-date">
            <img src="/public/icons/calendar.svg" alt="Calendar" className="card-icon" />
            {created_at}
          </span>
          <span className="card-views">
            <img src="/public/icons/watch.svg" alt="Watch" className="card-icon" />
            {view_count}
          </span>
        </div>
        <button className="card-button" onClick={() => onMoreClick({ id, summary, created_at, view_count, category, original_text })}>
          More
        </button>
      </div>
    </div>
  );
}
