import React from 'react';
import '../styles/Header.css';

function Header({ searchQuery, handleSearchChange, onSearch }) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch(searchQuery);
    }
  };

  return (
    <header className="header">
      <div className="title">
        <a href="#">요약좀</a>
      </div>
      <div className="search-container">
        <div className="search-title">검색하기</div>
        <div className="search-wrapper">
          <div className="search-bar">
            <input
              type="text"
              placeholder="검색"
              value={searchQuery}
              onChange={handleSearchChange}
              onKeyDown={handleKeyDown}
            />
          </div>
          <button className="search-btn" onClick={() => onSearch(searchQuery)}>
            <img src="Search-icon.png" alt="Search" className="search-icon" />
          </button>
        </div>
      </div>
      <div className="info">
        <a href="#">서비스 소개 글</a>
      </div>
    </header>
  );
}

export default Header;
