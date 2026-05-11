import React, { useState, useEffect } from 'react'
import PageHeader from '../components/ui/PageHeader'
import FilterSidebar from '../components/product/FilterSidebar'
import ProductCard from '../components/home/ProductCard'
import ProductCardList from '../components/product/ProductCardList'
import Pagination from '../components/ui/Pagination'
import { HiChevronLeft, HiChevronRight } from 'react-icons/hi'
import { HiOutlineChevronDown } from 'react-icons/hi'
import { BiMenu } from 'react-icons/bi'
import { TfiMenuAlt } from "react-icons/tfi";
import { TfiLayoutGrid2Alt } from "react-icons/tfi";
import { FiFilter } from "react-icons/fi";
import { getAllProducts } from '../api/Product-api'
import toast from 'react-hot-toast'



const Product = () => {
    const [sortBy, setSortBy] = useState("All");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [viewMode, setViewMode] = useState("grid"); // 'grid' or 'list'
    const [currentPage, setCurrentPage] = useState(1);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const itemsPerPage = 9;

    const sortOptions = [
        "All", "Featured", "Best selling", "Alphabetically, A-Z",
        "Alphabetically, Z-A", "Price, low to high", "Price, high to low"
    ];

    const fetchProducts = async () => {
        setLoading(true);

        try {
            const res = await getAllProducts();

            // console.log("API Response:", res); 

            if (res.success) {
                // Handle different possible response structures  
                const productsData = Array.isArray(res.data)
                    ? res.data
                    : (res.data?.products || res.products || []);

                setProducts(Array.isArray(productsData) ? productsData : []);
            } else {
                toast.error(res.message || "Failed to fetch products");
                setProducts([]); // Ensure it's an array even on failure
            }
        } catch (error) {
            console.log("Error fetching products:", error);

            toast.error(
                error?.response?.data?.message ||
                error.message ||
                "Something went wrong"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Pagination Logic
    const safeProducts = Array.isArray(products) ? products : [];
    const totalPages = Math.ceil(safeProducts.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentProducts = safeProducts.slice(indexOfFirstItem, indexOfLastItem);

    return (
        <div className="bg-gray-50/50 min-h-screen">
            <PageHeader title="Product List" />

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
                        <FilterSidebar onClose={() => setIsSidebarOpen(false)} />
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
                                    All Products ({safeProducts.length})
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
                        {loading ? (
                            <div className="flex justify-center items-center min-h-[400px]">
                                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)]"></div>
                            </div>
                        ) : products.length === 0 ? (
                            <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
                                <p className="text-xl font-semibold">No products found</p>
                                <button
                                    onClick={fetchProducts}
                                    className="mt-4 text-[var(--primary-color)] hover:underline"
                                >
                                    Try again
                                </button>
                            </div>
                        ) : viewMode === 'grid' ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
                                {currentProducts.map((product) => (
                                    <ProductCard key={product.id} {...product} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col gap-6 mt-5">
                                {currentProducts.map((product) => (
                                    <ProductCardList key={product.id} {...product} />
                                ))}
                            </div>
                        )}

                        {/* Pagination */}
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={(page) => setCurrentPage(page)}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Product