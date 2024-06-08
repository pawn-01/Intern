import React from 'react';

const Pagination = ({ currentPage, setCurrentPage, totalRows, rowsPerPage }) => {
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  return (
    <div className="pagination">
      <button
        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        &lt;
      </button>
      <span>{currentPage}</span>
      <button
        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
