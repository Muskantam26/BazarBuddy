import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi';

const SectionHeader = ({ title, linkText, linkPath, onClick, children }) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <h2 className="text-xl  lg:text-3xl text-center md:text-left font-extrabold text-[var(--heading-dark)]">
        {title}
      </h2>
      <div className="flex items-center gap-2 md:gap-4  whitespace-nowrap">
        {children}
        {linkText && (
          <div
            onClick={onClick}
            className="flex items-center gap-1 text-[var(--primary-color)] hover:text-[var(--primary-dark)] font-medium transition-colors group ml-2 cursor-pointer"
          >
            {linkText}
            <HiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionHeader;
