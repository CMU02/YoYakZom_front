import React from 'react';
import '../styles/nav.css';


export default function Category({ category, count, onClick }) {
    return (
      <div className="nav-item">
        <button onClick={onClick}>
          {category} <span className="count">({count})</span>
        </button>
      </div>
    );
  }