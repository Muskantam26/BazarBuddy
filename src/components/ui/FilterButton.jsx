import React from 'react';

const FilterButton = ({ children, isActive, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-bold text-xs   md:text-sm whitespace-nowrap transition-all duration-300 cursor-pointer ${
        isActive
          ? 'bg-[var(--primary-color)] text-white shadow-md border-transparent'
          : 'bg-transparent border border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-green-50'
      } ${className}`}
    >
      {children}
    </button>
  );
};

export default FilterButton;
