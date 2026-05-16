import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ image, name, path }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(path)}
      className="flex flex-col items-center justify-center p-2 border border-[var(--border-color)] rounded-xl hover:shadow-xl hover:bg-gray-100 transition-all duration-300 group cursor-pointer min-w-[140px]"
    >
      <div className="w-16 h-16 p-2 group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
        <img src={image} alt={name} className="w-full h-full object-contain" />
      </div>
      <span className="text-sm font-bold text-gray-900 tracking-wide group-hover:scale-110 transition-transform duration-300">
        {name}
      </span>
    </div>
  );
};

export default CategoryCard;
