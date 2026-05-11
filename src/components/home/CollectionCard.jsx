import React from 'react';
import { useNavigate } from 'react-router-dom';

const CollectionCard = ({ image, name, path }) => {
  const navigate = useNavigate();

  return (
    <div 
      onClick={() => path && navigate(path)}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group border border-gray-100"
    >
      {/* Image Container */}
      <div className="h-[200px] overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Content */}
      <div className="p-5 text-center relative">
        <h3 className="text-lg font-bold text-[var(--heading-dark)] group-hover:text-[var(--primary-color)] transition-colors">
          {name}
        </h3>
        
        {/* Decorative Circles (matching the image) */}
        <div className="absolute bottom-2 right-4 flex gap-[-10px]">
          <div className="w-6 h-6 rounded-full bg-[var(--primary-color)] opacity-10 translate-x-2"></div>
          <div className="w-6 h-6 rounded-full bg-[var(--primary-color)] opacity-20"></div>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
