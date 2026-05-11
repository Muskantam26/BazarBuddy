import React from 'react';

const Brands = ({  Image }) => {
  return (
    <div
      className="flex flex-col items-center justify-center p-4 border border-[var(--border-color)] rounded-xl hover:shadow-xl hover:border-[var(--primary-color)] transition-all duration-300 group cursor-pointer"
    > 
      <div className="w-20 h-20  flex items-center justify-center">
        <img src={Image} className="w-full h-full object-contain" />
      </div>
    
    </div>
  );
};

export default Brands;
