import React from 'react';
import Button1 from '../ui/Button1';
import Input from '../ui/Input';
import { BsXLg } from 'react-icons/bs';
import { categories as mockCategories, brands as mockBrands } from '../../data/mockData';

const FilterSidebar = ({ 
  selectedCategories, 
  onCategoryChange, 
  selectedBrands, 
  onBrandChange, 
  priceRange, 
  onPriceChange, 
  onClearFilters,
  onClose 
}) => {
  const categories = mockCategories.map(cat => cat.name);
  const brands = mockBrands;

  return (
    <aside className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-8 h-full lg:h-fit sticky top-24 overflow-y-auto lg:overflow-visible">
      <div className='flex items-center justify-between'>
        <h2 className="text-xl font-extrabold text-gray-900 ">Filters</h2>
        <div className="flex items-center gap-4">
          <button 
            onClick={onClearFilters}
            className="text-sm font-bold text-[var(--primary-color)] hover:underline"
          >
            Reset
          </button>
          {onClose && (
            <button 
              onClick={onClose}
              className='lg:hidden p-2 text-gray-500 hover:text-black transition-colors'
            >
              <BsXLg size={20} />
            </button>
          )}
        </div>
      </div>
      <hr className='border-gray-200 -mt-4'/>

      {/* Categories Section */}
      <div>
        <h3 className="text-lg font-bold text-black mb-4">Categories</h3>
        <div className="flex flex-col gap-3">
          {categories.map((cat, index) => (
            <label key={index} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded border-gray-300 text-[var(--primary-color)] focus:ring-[var(--primary-color)] cursor-pointer accent-[var(--primary-color)]"
                checked={selectedCategories.includes(cat)}
                onChange={() => onCategoryChange(cat)}
              />
              <span className={`text-[16px] transition-colors ${selectedCategories.includes(cat) ? 'text-[var(--primary-color)] font-bold' : 'text-[var(--text-main)] group-hover:text-[var(--primary-color)]'}`}>
                {cat}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range Section */}
      <div>
        <h3 className="text-lg font-bold text-black mb-4">Price Range</h3>
        <div className="flex flex-col gap-4">
          <input 
            type="range" 
            min="0" 
            max="2000" 
            value={priceRange}
            onChange={(e) => onPriceChange(e.target.value)}
            className="w-full h-[6px] rounded-lg appearance-none cursor-pointer accent-[var(--primary-color)] range-input"
            style={{
              background: `linear-gradient(to right, var(--price-fill, #10b981) 0%, var(--price-fill, #10b981) ${(priceRange / 2000) * 100}%, var(--price-track, #e5e7eb) ${(priceRange / 2000) * 100}%, var(--price-track, #e5e7eb) 100%)`
            }}
          />
          <div className="flex justify-between text-[var(--text-muted)] font-medium text-sm">
            <span>₹ 0.0</span>
            <span>₹ {parseFloat(priceRange).toLocaleString()}.0</span>
          </div>
        </div>
      </div>

      {/* Brands Section */}
      <div>
        <h3 className="text-lg font-bold text-black mb-4">Brands</h3>
        <div className="flex flex-col gap-3">
          {brands.map((brand, index) => (
            <label key={index} className="flex items-center gap-3 cursor-pointer group">
              <input 
                type="checkbox" 
                className="w-5 h-5 rounded border-gray-300 text-[var(--primary-color)] focus:ring-[var(--primary-color)] cursor-pointer accent-[var(--primary-color)]"
                checked={selectedBrands.includes(brand)}
                onChange={() => onBrandChange(brand)}
              />
              <span className={`text-[16px] transition-colors ${selectedBrands.includes(brand) ? 'text-[var(--primary-color)] font-bold' : 'text-[var(--text-main)] group-hover:text-[var(--primary-color)]'}`}>
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      <Button1 onClick={onClose} className="lg:hidden">Apply Filters</Button1>
    </aside>
  );
};

export default FilterSidebar;

