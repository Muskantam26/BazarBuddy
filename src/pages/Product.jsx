import React, { useState, useEffect, useMemo } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'
import FilterSidebar from '../components/product/FilterSidebar'
import ProductCard from '../components/home/ProductCard'
import ProductCardList from '../components/product/ProductCardList'
import Pagination from '../components/ui/Pagination'
import { HiOutlineChevronDown } from 'react-icons/hi'
import { TfiMenuAlt } from "react-icons/tfi";
import { TfiLayoutGrid2Alt } from "react-icons/tfi";
import { FiFilter } from "react-icons/fi";
import { products as mockProducts } from '../data/mockData'
import { useDispatch } from 'react-redux'
import { incrementCount, addItemOptimistically } from '../redux/slices/cartSlice'
import toast from 'react-hot-toast'

const Product = () => {
    const { id: categoryParam } = useParams();
    const location = useLocation();
    
    const [sortBy, setSortBy] = useState("All");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
    const [currentPage, setCurrentPage] = useState(1);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    // Filter states
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedBrands, setSelectedBrands] = useState([]);
    const [priceRange, setPriceRange] = useState(2000);
    
    const dispatch = useDispatch();

    // Update selected category or search based on URL param or pathname
    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const searchTerm = queryParams.get('search');
        const path = location.pathname.split('/').pop();
        const knownCategories = ["Snacks", "Groceries", "Fruits", "Beverages", "Vegetables", "Eggs", "Dairy", "Seafood"];
        
        if (searchTerm) {
            setSelectedCategories([]);
            setSelectedBrands([]);
            // We'll handle filtering by search term in useMemo
            setCurrentPage(1);
        } else if (categoryParam) {
            const categoryName = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1).toLowerCase();
            setSelectedCategories([categoryName]);
            setCurrentPage(1);
        } else {
            const matchedCategory = knownCategories.find(cat => cat.toLowerCase() === path.toLowerCase());
            if (matchedCategory) {
                setSelectedCategories([matchedCategory]);
                setCurrentPage(1);
            } else if (location.pathname === '/products') {
                setSelectedCategories([]);
                setSelectedBrands([]);
                setPriceRange(2000);
                setCurrentPage(1);
            }
        }
    }, [categoryParam, location.pathname, location.search]);

    const sortOptions = [
        "All", "Featured", "Best selling", "Alphabetically, A-Z",
        "Alphabetically, Z-A", "Price, low to high", "Price, high to low"
    ];

    const handleAddToCart = (productId, productName) => {
        toast.success(`${productName} added to cart!`);
        dispatch(incrementCount(1));
        dispatch(addItemOptimistically(productId));
        window.dispatchEvent(new Event('cartUpdated'));
    };

    // Filtering Logic
    const filteredProducts = useMemo(() => {
        let result = [...mockProducts];
        
        const queryParams = new URLSearchParams(location.search);
        const searchTerm = queryParams.get('search')?.toLowerCase();

        // Filter by Search Term
        if (searchTerm) {
            result = result.filter(p => 
                p.name.toLowerCase().includes(searchTerm) || 
                p.category.toLowerCase().includes(searchTerm)
            );
        }

        // Filter by Category
        if (selectedCategories.length > 0) {
            result = result.filter(p => selectedCategories.includes(p.category));
        }

        // Filter by Brand
        if (selectedBrands.length > 0) {
            result = result.filter(p => selectedBrands.includes(p.brand));
        }

        // Filter by Price
        result = result.filter(p => parseFloat(p.price) <= priceRange);

        // Sorting
        switch (sortBy) {
            case "Alphabetically, A-Z":
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case "Alphabetically, Z-A":
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
            case "Price, low to high":
                result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
                break;
            case "Price, high to low":
                result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
                break;
            default:
                break;
        }

        return result;
    }, [selectedCategories, selectedBrands, priceRange, sortBy, location.search]);

    // Pagination Logic
    const itemsPerPage = 9;
    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

    // Filter handlers
    const handleCategoryChange = (category) => {
        setSelectedCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category) 
                : [...prev, category]
        );
        setCurrentPage(1);
    };

    const handleBrandChange = (brand) => {
        setSelectedBrands(prev => 
            prev.includes(brand) 
                ? prev.filter(b => b !== brand) 
                : [...prev, brand]
        );
        setCurrentPage(1);
    };

    const handlePriceChange = (value) => {
        setPriceRange(value);
        setCurrentPage(1);
    };

    const handleClearFilters = () => {
        setSelectedCategories([]);
        setSelectedBrands([]);
        setPriceRange(2000);
        setCurrentPage(1);
    };

    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('search');

    return (
        <div className="bg-gray-50/50 min-h-screen">
            <PageHeader title={searchTerm ? `Search Results for "${searchTerm}"` : (categoryParam ? `${categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1)}` : "All Products")} />

            <div className="mx-auto px-4 py-10 ">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Backdrop Overlay for Mobile Sidebar */}
                    {isSidebarOpen && (
                        <div
                            className="fixed inset-0 bg-black/50 z-[150] lg:hidden transition-opacity duration-300"
                            onClick={() => setIsSidebarOpen(false)}
                        />
                    )}

                    {/* Sidebar Container */}
                    <div className={`
                        fixed inset-y-0 left-0 w-[280px] bg-white z-[151] lg:static lg:z-auto lg:w-1/4 
                        transform transition-transform duration-300 ease-in-out
                        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
                        h-full lg:h-auto
                    `}>
                        <FilterSidebar 
                            selectedCategories={selectedCategories}
                            onCategoryChange={handleCategoryChange}
                            selectedBrands={selectedBrands}
                            onBrandChange={handleBrandChange}
                            priceRange={priceRange}
                            onPriceChange={handlePriceChange}
                            onClearFilters={handleClearFilters}
                            onClose={() => setIsSidebarOpen(false)} 
                        />
                    </div>

                    {/* Product List Section */}
                    <div className="w-full lg:w-3/4">
                        {/* Top Bar / Results Header */}
                        <div className="flex flex-col sm:flex-row justify-between items-center p-4 mb-8 gap-4">
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                {/* Mobile Filter Toggle Button */}
                                <button
                                    onClick={() => setIsSidebarOpen(true)}
                                    className="lg:hidden p-2.5 bg-green-50 text-[var(--primary-color)] rounded-lg border border-green-100 hover:bg-green-100 transition-colors"
                                >
                                    <FiFilter size={20} />
                                </button>

                                <h2 className="text-xl font-extrabold text-gray-900">
                                    Products Found ({filteredProducts.length})
                                </h2>
                            </div>

                            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                {/* View Switcher */}
                                <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden bg-white">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-[var(--primary-color)] text-white' : 'text-black font-extrabold hover:text-gray-900'}`}
                                    >
                                        <TfiLayoutGrid2Alt size={20} />
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-[var(--primary-color)] text-white' : 'text-black font-extrabold hover:text-gray-900'}`}
                                    >
                                        <TfiMenuAlt size={20} />
                                    </button>
                                </div>

                                {/* Custom Sort Dropdown */}
                                <div className="relative min-w-[160px] sm:min-w-[180px]">
                                    <div
                                        onClick={() => setIsSortOpen(!isSortOpen)}
                                        className="flex items-center justify-between border border-[var(--primary-color)] rounded-lg px-4 py-2 text-sm font-medium text-gray-700 cursor-pointer bg-white"
                                    >
                                        {sortBy} <HiOutlineChevronDown className={`transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`} />
                                    </div>

                                    {/* Dropdown Options */}
                                    {isSortOpen && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-40"
                                                onClick={() => setIsSortOpen(false)}
                                            ></div>
                                            <div className="absolute top-full right-0 mt-1 w-full bg-white border border-gray-100 rounded-lg shadow-xl z-50 py-1 animate-in fade-in slide-in-from-top-2 duration-200">
                                                {sortOptions.map((option) => (
                                                    <div
                                                        key={option}
                                                        onClick={() => {
                                                            setSortBy(option);
                                                            setIsSortOpen(false);
                                                        }}
                                                        className={`px-4 py-2 text-sm font-medium transition-colors cursor-pointer ${sortBy === option
                                                            ? 'bg-[var(--primary-color)] text-white'
                                                            : 'hover:bg-gray-50 text-gray-700'
                                                            } ${option === 'Price, low to high' ? 'border-t border-gray-50' : ''}`}
                                                    >
                                                        {option}
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>

                        <hr className=" border-gray-200 w-full" />
                        {/* Product Display */}
                        {filteredProducts.length === 0 ? (
                            <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
                                <p className="text-xl font-semibold">No products found matching your filters</p>
                                <button
                                    onClick={handleClearFilters}
                                    className="mt-4 text-[var(--primary-color)] hover:underline font-bold"
                                >
                                    Clear all filters
                                </button>
                            </div>
                        ) : viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
                                {currentProducts.map((product) => (
                                    <ProductCard 
                                        key={product._id || product.id} 
                                        {...product} 
                                        onCartClick={() => handleAddToCart(product._id || product.id, product.name)}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col gap-6 mt-5">
                                {currentProducts.map((product) => (
                                    <ProductCardList 
                                        key={product._id || product.id} 
                                        {...product} 
                                        onCartClick={() => handleAddToCart(product._id || product.id, product.name)}
                                    />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={(page) => setCurrentPage(page)}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product