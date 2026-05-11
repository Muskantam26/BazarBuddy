import React from 'react';

const Input = ({ 
    type = "text", 
    placeholder = "", 
    value, 
    onChange, 
    className = "", 
    onFocus, 
    onBlur,
    ...props 
}) => {
    return (
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            onFocus={onFocus}
            onBlur={onBlur}
            className={`outline-none transition-all duration-300 ${className}`}
            {...props}
        />
    );
};

export default Input;
