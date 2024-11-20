import React from 'react';
import '../styles/Card.css';

// originalText를 잘라주는 함수
const truncateText = (text, maxLength = 100) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

export default function Card({ category, summary, originalText, createdAt, viewCount }) {
  return (
    <div className="card">
      <div className="card-header">
        <span className="card-category">{category}</span>
      </div>
      <div className="card-content">
        <h3 className="card-summary">{summary}</h3>
        <hr className="card-divider" />
        <p className="card-original-text">{truncateText(originalText, 100)}</p>
      </div>
      <div className="card-footer">
        <div className="card-meta">
          <span className="card-date">{createdAt}</span>
          <span className="card-views">👁 {viewCount}</span>
        </div>
        <button className="card-button">More</button>
      </div>
    </div>
  );
}
