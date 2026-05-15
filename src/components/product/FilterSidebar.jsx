import React, { useState } from 'react';
import Button1 from '../ui/Button1';
import Input from '../ui/Input';
import { BsXLg } from 'react-icons/bs';

const FilterSidebar = ({ onClose }) => {
  const [priceRange, setPriceRange] = useState(1580);
  
  const categories = [
    "Vegetables", "Snacks", "Groceries", "Fruits", 
    "Beverages", "Eggs", "Dairy", "Seafood"
  ];

  const brands = [
    "GoodCart Co", "EcoGro Partners", "Farmlio Foods", 
    "DailyDrop Supplies", "HarvestMate", "GreenBasket Co", "FreshNest"
  ];

  return (
    <aside className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col gap-8 h-full lg:h-fit sticky top-24 overflow-y-auto lg:overflow-visible">
      <div className='flex items-center justify-between'>
        <h2 className="text-xl font-extrabold text-gray-900 ">Filters</h2>
        {onClose && (
          <button 
            onClick={onClose}
            className='lg:hidden p-2 text-gray-500 hover:text-black transition-colors'
          >
            <BsXLg size={20} />
          </button>
        )}
      </div>
      <hr className='border-gray-200 -mt-4'/>

      {/* Categories Section */}
      <div>
        <h3 className="text-lg font-bold text-black mb-4">Categories</h3>
        <div className="flex flex-col gap-3">
          {categories.map((cat, index) => (
            <label key={index} className="flex items-center gap-3 cursor-pointer group">
              <Input 
                type="checkbox" 
                className="w-5 h-5 rounded border-gray-300 text-[var(--primary-color)] focus:ring-[var(--primary-color)] cursor-pointer"
                defaultChecked={cat === "Snacks"}
              />
              <span className="text-[var(--text-main)] text-[16px] group-hover:text-[var(--primary-color)] transition-colors">
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
          <Input 
            type="range" 
            min="0" 
            max="2000" 
            value={priceRange}
            onChange={(e) => setPriceRange(e.target.value)}
            className="w-full h-[6px] rounded-lg appearance-none cursor-pointer accent-[var(--primary-color)] range-input"
            style={{
              background: `linear-gradient(to right, var(--price-fill) 0%, var(--price-fill) ${(priceRange / 2000) * 100}%, var(--price-track) ${(priceRange / 2000) * 100}%, var(--price-track) 100%)`
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
              <Input 
                type="checkbox" 
                className="w-5 h-5 rounded border-gray-300 text-[var(--primary-color)] focus:ring-[var(--primary-color)] cursor-pointer"
              />
              <span className="text-[var(--text-main)] text-[16px] group-hover:text-[var(--primary-color)] transition-colors">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>

      
      <Button1>Apply Filters</Button1>
    </aside>
  );
};

export default FilterSidebar;
