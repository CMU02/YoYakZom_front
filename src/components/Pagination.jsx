import '../styles/Pagination.css';

export default function Pagination({ currentPage, pageSize, handlePageChange }) {
    return (
        <div className='pagination'>
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className='prev-btn'
            >
                이전
            </button>
            {
                Array.from({ length: pageSize }, (_, index) => index + 1).map(page => (
                    <button
                        onClick={() => handlePageChange(page)}
                        key={page}
                        className={currentPage === page ? 'number-active' : 'number'}
                    >
                        {page}
                    </button>
                ))
            }
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === pageSize}
                className='next-btn'
            >
                다음
            </button>
        </div>
    )
}