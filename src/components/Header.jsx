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
        <a href="#">정보 과부하 속에서 핵심 내용을 빠르게 파악하기 어려운 시대입니다. &apos;3줄요약&apos; 서비스는 이러한 문제를 해결하기 위해 설계된 솔루션으로, 방대한 글이나 자료를 3줄로 간략하게 요약하여 사용자들이 중요한 정보를 놓치지 않고 효율적으로 습득할 수 있도록 돕습니다.</a>
      </div>
    </header>
  );
}

export default Header;
