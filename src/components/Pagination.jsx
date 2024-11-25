import React from 'react';
import '../styles/Pagination.css';

function Pagination({ total, pageSize, currentPage, onPageChange }) {
  const totalPages = Math.ceil(total / pageSize);  // 총 페이지 수 계산

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);  // 페이지 클릭 시 페이지 변경
  };

  return (
    <div className="pagination-container"> 
      <button
        className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`} 
        disabled={currentPage === 1}
        onClick={() => handlePageClick(1)}
      >
        처음
      </button>
      <button
        className={`pagination-button ${currentPage === 1 ? 'disabled' : ''}`} 
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
      >
        이전
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          className={`pagination-button ${currentPage === index + 1 ? 'active' : ''}`}
          onClick={() => handlePageClick(index + 1)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`} 
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
      >
        다음
      </button>
      <button
        className={`pagination-button ${currentPage === totalPages ? 'disabled' : ''}`} 
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(totalPages)}
      >
        마지막
      </button>
    </div>
  );
}

export default Pagination;
