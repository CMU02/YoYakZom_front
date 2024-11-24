import React from 'react';
import '../styles/nav.css';

export default function Category({ category, count, onClick }) {
    return (
      <div className="nav-item" onClick={onClick}>
          {category} <span className="count">({count})</span>
      </div>
    );
}
