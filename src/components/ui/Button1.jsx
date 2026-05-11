import React from 'react';

const Button1 = ({ children = "Search", onClick, className = '', type = 'button', ...props }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2.5 rounded-lg text-white font-semibold text-base transition-all bg-[var(--primary-color)]  hover:bg-[var(--primary-dark)] duration-200 active:scale-95 cursor-pointer  shadow-sm ${className}`}
    //   style={{ backgroundColor: 'var(--primary-color)',}}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button1;