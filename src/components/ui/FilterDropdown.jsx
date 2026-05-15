import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown } from 'react-icons/fa6';
import Input from './Input';

const FilterDropdown = ({ options, selected, onSelect, placeholder = "Filter" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [search, setSearch] = useState("");
    const dropdownRef = useRef(null);

    const filteredOptions = options.filter(option => 
        option.toLowerCase().includes(search.toLowerCase())
    );

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block text-left" ref={dropdownRef}>
            <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[var(--text-color)]">{placeholder}:</span>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center justify-between gap-4 px-4 py-2 bg-white border border-[var(--border-color)] rounded-lg text-sm font-medium text-[var(--text-main)] hover:border-[var(--primary-color)] transition-all min-w-[140px]"
                >
                    {selected}
                    <FaChevronDown className={`text-xs transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
            </div>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-[var(--border-color)] rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
                    <div className="p-2 border-b border-[var(--border-color)]">
                        <Input 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search..."
                            className="w-full px-3 py-1.5 text-sm border border-[var(--border-color)] rounded-md focus:border-[var(--primary-color)]"
                        />
                    </div>
                    <div className="max-h-60 overflow-y-auto py-1">
                        {filteredOptions.length > 0 ? (
                            filteredOptions.map((option) => (
                                <button
                                    key={option}
                                    onClick={() => {
                                        onSelect(option);
                                        setIsOpen(false);
                                        setSearch("");
                                    }}
                                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                                        selected === option 
                                            ? 'bg-[var(--primary-color)] text-white' 
                                            : 'text-[var(--text-main)] hover:bg-[var(--primary-light)] hover:text-[var(--primary-color)]'
                                    }`}
                                >
                                    {option}
                                </button>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-sm text-[var(--text-muted)] italic">
                                No options found
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;
