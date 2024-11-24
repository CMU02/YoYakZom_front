import React from 'react';
import '../styles/nav.css';


export default function Category({ category, count, onClick }) {
    return (
      <div className="nav-item">
          {category} <span className="count" onClick={onClick}>({count})</span>    
      </div>
    );
  }