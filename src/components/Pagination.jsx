import React from 'react';

function Pagination({ total, pageSize, currentPage, onPageChange }) {
  const totalPages = Math.ceil(total / pageSize);  // 총 페이지 수 계산

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);  // 페이지 클릭 시 페이지 변경
  };

  return (
    <div className="pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageClick(1)}
      >
        처음
      </button>
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
      >
        이전
      </button>
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageClick(index + 1)}
          className={currentPage === index + 1 ? 'active' : ''}
        >
          {index + 1}
        </button>
      ))}
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
      >
        다음
      </button>
      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(totalPages)}
      >
        마지막
      </button>
    </div>
  );
}

export default Pagination;
