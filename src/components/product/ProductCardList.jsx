import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsCart3, BsHeart } from 'react-icons/bs';

const ProductCardList = ({ id, image, tag, name, description, price, oldPrice, onCartClick, onWishlistClick }) => {
  const navigate = useNavigate();

  const getTagColor = (tag) => {
    switch (tag?.toLowerCase()) {
      case 'organic': return 'bg-orange-500';
      case 'healthy': return 'bg-orange-500';
      case 'natural': return 'bg-orange-500';
      default: return 'bg-[var(--primary-color)]';
    }
  };

  const handleNavigate = (e) => {
    if (e.target.closest('button')) return;
    navigate(`/product/${id || 1}`);
  };

  return (
    <div 
      onClick={handleNavigate}
      className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all duration-300 group flex flex-col md:flex-row gap-6 items-center cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative w-full md:w-64 h-48 rounded-xl border border-gray-50 overflow-hidden flex items-center justify-center p-4 bg-white flex-shrink-0">
        {tag && (
          <span className={`absolute top-3 left-3 ${getTagColor(tag)} text-white text-[10px] font-bold px-3 py-1 rounded-md z-10 uppercase tracking-wider`}>
            {tag}
          </span>
        )}
        <img
          src={image}
          alt={name}
          className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content Container */}
      <div className="flex-1 flex flex-col py-2 w-full">
        <div className="flex flex-col mb-4">
          <h3 className="text-xl font-bold text-[var(--primary-color)] mb-2 group-hover:opacity-80 transition-opacity">
            {name}
          </h3>
          <p className="text-[var(--text-muted)] text-[15px] leading-relaxed line-clamp-2 md:line-clamp-3">
            {description}
          </p>
        </div>

        {/* Bottom Section */}
        <div className="mt-auto pt-4 flex flex-wrap items-center justify-between gap-4 border-t border-gray-50">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold text-[var(--text-main)]">
              ${price}
            </span>
            {oldPrice && (
              <span className="text-sm text-[var(--text-light)] line-through">
                ${oldPrice}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onWishlistClick}
              className="p-2.5 rounded-full bg-[var(--bg-soft)] text-[var(--text-light)] hover:bg-[var(--bg-soft)] hover:text-red-500 transition-all duration-300 shadow-sm"
            >
              <BsHeart size={20} />
            </button>
            <button
              onClick={onCartClick}
              className="p-3 rounded-full bg-[var(--primary-color)] text-white hover:bg-[var(--primary-dark)] transition-all duration-300 shadow-lg shadow-green-100 flex items-center justify-center"
            >
              <BsCart3 size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardList;
