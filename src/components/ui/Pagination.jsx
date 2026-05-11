import React from 'react';
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="flex justify-center mt-12">
      <div className="flex items-center gap-2">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center transition-all ${
            currentPage === 1 
            ? 'text-gray-300 cursor-not-allowed' 
            : 'text-gray-600 hover:bg-[var(--primary-color)] hover:text-white hover:border-[var(--primary-color)]'
          }`}
        >
          <HiChevronLeft size={20} />
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span key={`dots-${index}`} className="text-gray-400 px-2 font-bold select-none">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-lg font-bold transition-all ${
                currentPage === page
                ? 'bg-[var(--primary-color)] text-white shadow-md'
                : 'border border-gray-200 text-gray-600 hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]'
              }`}
            >
              {page}
            </button>
          )
        ))}

        {/* Next Button */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`w-10 h-10 rounded-lg border border-gray-200 flex items-center justify-center transition-all ${
            currentPage === totalPages 
            ? 'text-gray-300 cursor-not-allowed' 
            : 'text-gray-600 hover:bg-[var(--primary-color)] hover:text-white hover:border-[var(--primary-color)]'
          }`}
        >
          <HiChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
