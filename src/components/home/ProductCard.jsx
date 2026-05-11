import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BsCart3, BsHeart, BsCheck2Circle } from 'react-icons/bs';

const ProductCard = ({ id, image, tag, name, description, price, oldPrice, onCartClick, onWishlistClick, showCheck }) => {
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
    // Prevent navigation if clicking on cart or wishlist buttons
    if (e.target.closest('button')) return;
    navigate(`/product/${id || 1}`);
  };

  return (
    <div
      onClick={handleNavigate}
      className="bg-[var(--white)] h-full   rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 group relative flex flex-wrap cursor-pointer"
    >
      {/* Check Icon */}
      {showCheck && (
        <div className="absolute top-5 left-4 z-20">
          <div className="bg-[var(--primary-color)] text-white p-1 rounded-md shadow-sm">
            <BsCheck2Circle size={16} />
          </div>
        </div>
      )}

      {/* Tag */}
      {tag && (
        <span className={`absolute top-5  ${getTagColor(tag)} text-white text-[10px] font-bold px-3 py-1 rounded-md z-10 uppercase tracking-wider`}>
          {tag}
        </span>
      )}

      {/* Image Container */}
      <div className="relative  h-50 w-full overflow-hidden flex items-center justify-center ">
        <img
          src={image}
          alt={name}
          className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-500"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow mt-5">
        <h3 className="text-xl font-bold text-[var(--text-main)] mb-2 group-hover:text-[var(--primary-color)] transition-colors line-clamp-1">
          {name}
        </h3>
        <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2 leading-relaxed">
          {description}
        </p>

        {/* Bottom Section: Price and Actions */}
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
          <div className="flex items-center gap-1">
            <span className="text-xl font-extrabold text-[var(--text-main)]">
              ${price}
            </span>
            {oldPrice && (
              <span className="text-sm text-[var(--text-light)] line-through">
                ${oldPrice}
              </span>
            )}
          </div>

          <div className="flex gap-2">
            <button
              onClick={onWishlistClick}
              className="p-2.5 rounded-full bg-[var(--bg-soft)] text-[var(--text-light)] hover:bg-[var(--bg-soft)] hover:text-red-500 transition-all duration-300 shadow-sm"
              aria-label="Add to wishlist"
            >
              <BsHeart size={18} />
            </button>
            <button
              onClick={onCartClick}
              className="p-2.5 rounded-full bg-[var(--primary-color)] text-white hover:bg-[var(--primary-dark)] transition-all duration-300 shadow-lg shadow-green-100 group-hover:scale-110"
              aria-label="Add to cart"
            >
              <BsCart3 size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
