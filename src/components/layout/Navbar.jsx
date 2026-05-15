import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import authStorage from '../../utils/authStorage';
import { fetchCartCount, fetchCartItems } from '../../redux/slices/cartSlice';
import toast from 'react-hot-toast';
import paths from '../../path/path';

import Input from '../ui/Input';
import Button1 from '../ui/Button1';
import { 
    BsBuildings, 
    BsCart3, 
    BsPerson, 
    BsSearch, 
    BsList, 
    BsXLg, 
    BsLink45Deg, 
    BsChevronDown,
    BsHeart
} from 'react-icons/bs';
import {appLogo, backendConfig} from"../../constants/constant/Maincontent";
import { getAllCategories } from '../../api/Categories-api';
import { getAllProducts } from '../../api/Product-api';

const Navbar = ({ onCartClick }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [allProducts, setAllProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const wishlistItems = useSelector((state) => state.wishlist.items);
  const cartCount = useSelector((state) => state.cart.count);
  const { isAuthenticated, userName } = useSelector((state) => state.auth);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await getAllCategories();
      if (res.success) {
        const categoriesData = Array.isArray(res.data)
          ? res.data
          : (res.data?.categories || res.categories || []);

        const formattedCategories = categoriesData.map(cat => ({
          name: cat.name || cat.categoryName,
          path: `/category/${cat._id || cat.id}`
        }));

        setCategories(formattedCategories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchAllProducts = async () => {
    try {
      const res = await getAllProducts();
      if (res.success) {
        const productsData = Array.isArray(res.data)
          ? res.data
          : (res.data?.products || res.products || []);
        setAllProducts(productsData);
      }
    } catch (error) {
      console.error("Error fetching products for search:", error);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setFilteredProducts([]);
      return;
    }

    const filtered = allProducts.filter(product => 
      product.name?.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 10); // Limit to 10 results
    
    setFilteredProducts(filtered);
    setIsDropdownOpen(true);
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchCartCount());
      dispatch(fetchCartItems());
    }
    fetchCategories();
    fetchAllProducts();
    
    // Listen for custom cart update events (for backward compatibility if needed)
    const handleCartUpdateEvent = () => {
      dispatch(fetchCartCount());
    };
    window.addEventListener('cartUpdated', handleCartUpdateEvent);
    return () => window.removeEventListener('cartUpdated', handleCartUpdateEvent);
  }, [isAuthenticated, dispatch]);

  const handleLogout = () => {
    authStorage.removeToken();
    dispatch(logout());
    toast.success('Logged out successfully');
    navigate(paths.home);
  };


  // Dynamic Navigation Links
  const navLinks = categories.length > 0 ? categories : [
    { name: "Snacks", path: paths.snacks },
    { name: "Groceries", path: paths.groceries },
    { name: "Fruits", path: paths.fruits },
    { name: "Beverages", path: paths.beverages },
  ];

  return (
    <div className='w-full bg-white border-b border-[var(--border-color)] sticky top-0 z-[100]'>
        <div className='  px-4 md:px-4 py-3 flex items-center justify-between gap-4'>
            
            {/* Left Section: Logo */}
            <div onClick={() => navigate(paths.home)} className='flex-shrink-0 cursor-pointer'>
                <img className='h-8 md:h-10 object-contain' src={appLogo} alt="Greentic Logo" />
            </div>
            
            {/* Middle Section: Search Bar (Hidden on Mobile) */}
            <div className='hidden md:flex flex-1 max-w-xl relative'>
                {/* Search Bar Container */}
                <div 
                  className={`flex items-center w-full border-2 transition-colors duration-300 ${isDropdownOpen ? 'border-[var(--primary-color)]' : 'border-[var(--border-light)]'} rounded-xl p-1 bg-white relative z-20`}
                >
                    <Input 
                      className='flex-1 px-4 md:px-6 py-1 text-[var(--text-main)] bg-transparent text-sm md:text-base placeholder-[var(--text-light)]' 
                      placeholder='Search products...' 
                      value={searchQuery}
                      onChange={handleSearchChange}
                      onFocus={() => {
                        if (searchQuery.trim() !== '') setIsDropdownOpen(true);
                      }}
                      onBlur={() => setTimeout(() => setIsDropdownOpen(false), 200)}
                    />
                    
                    <div 
                      className='px-3 cursor-pointer text-black hover:text-[var(--primary-color)] transition-colors flex items-center justify-center' 
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <BsChevronDown size={12} />
                    </div>

                    <Button1 className='!py-2 !px-5 !text-sm !rounded-lg !font-medium'>Search</Button1>
                </div>

                {/* Dropdown Menu */}
                {isDropdownOpen && (
                    <div className='absolute top-[110%] left-0 right-0 mt-2 bg-[var(--dropdown-bg)] rounded-xl shadow-2xl z-50 py-2 border border-gray-800 text-white'>
                        <div className="absolute -top-2 right-[100px] w-4 h-4 bg-[var(--dropdown-bg)] transform rotate-45 border-t border-l border-gray-800"></div>
                        <div className='relative z-10 max-h-[400px] overflow-y-auto custom-scrollbar'>
                            {filteredProducts.length > 0 ? (
                              filteredProducts.map((product, index) => (
                                <div 
                                    key={product._id || index} 
                                    onClick={() => {
                                      navigate(`/product/${product._id}`);
                                      setIsDropdownOpen(false);
                                      setSearchQuery('');
                                    }}
                                    className='px-6 py-3 hover:bg-[var(--dropdown-hover)] cursor-pointer text-sm font-medium text-[var(--text-on-dark)] transition-colors border-b border-gray-800/50 last:border-none'
                                >
                                    {product.name}
                                </div>
                              ))
                            ) : (
                              <div className='px-6 py-4 text-sm text-gray-400'>
                                No products found
                              </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Desktop Navigation Links (Hidden on Tablet/Mobile) */}
            <div className='hidden lg:flex items-center gap-5'>
                {navLinks.map((link, index) => (
                    <div 
                      key={index} 
                      onClick={() => navigate(link.path)}
                      className='text-[var(--text-color)] font-medium text-[15px] hover:text-[var(--primary-color)] transition-colors cursor-pointer tracking-wide whitespace-nowrap'
                    >
                        {link.name}
                    </div>
                ))}
            </div>
            
            {/* Right Section: Icons */}  
            <div className='flex items-center gap-3 flex-shrink-0'>
                {/* Search Icon - Mobile Only */}
                <button className='flex md:hidden text-[var(--text-color)] hover:text-[var(--primary-color)] transition-colors cursor-pointer'>
                    <BsSearch size={22} />
                </button>

                {/* Building / Store Icon */}
                <button className='text-[var(--text-color)] hover:text-[var(--primary-color)] transition-colors cursor-pointer'>
                    <BsBuildings size={24} />
                </button>

                {/* Wishlist Icon */}
                <button 
                  onClick={() => navigate(paths.profileWishlist)}
                  className='text-[var(--text-color)] hover:text-[var(--primary-color)] transition-colors cursor-pointer flex items-center justify-center relative group'
                >
                    <BsHeart size={22} />
                    {wishlistItems.length > 0 && (
                        <span className='absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold h-4.5 w-4.5 rounded-full flex items-center justify-center border-2 border-white shadow-sm group-hover:scale-110 transition-transform'>
                            {wishlistItems.length}
                        </span>
                    )}
                </button>

                {/* Cart Icon with Dynamic Badge */}
                <button 
                  onClick={onCartClick}
                  className='text-[var(--text-color)] hover:text-[var(--primary-color)] transition-colors relative cursor-pointer group'
                >
                    <BsCart3 size={24} />
                    <span className='absolute -top-2 -right-2.5 bg-[var(--accent-color)] text-white text-[10px] font-bold h-5 w-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm group-hover:scale-110 transition-transform'>
                        {cartCount}
                    </span>
                </button>

                {/* User Profile / Login */}
                <div className="relative">
                    <button 
                      onClick={() => isAuthenticated ? setIsUserDropdownOpen(!isUserDropdownOpen) : navigate(paths.login)}
                      className='text-[var(--text-color)] hover:text-[var(--primary-color)] transition-colors cursor-pointer flex items-center gap-1'
                    >
                        <BsPerson size={26} />
                        {isAuthenticated && <BsChevronDown size={12} className={`transition-transform duration-300 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />}
                    </button>

                    {/* User Dropdown */}
                    {isAuthenticated && isUserDropdownOpen && (
                        <>
                            <div 
                              className="fixed inset-0 z-40" 
                              onClick={() => setIsUserDropdownOpen(false)}
                            ></div>
                            <div className="absolute top-[120%] right-0 w-48 bg-white border border-gray-100 rounded-xl shadow-xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                <div className="px-4 py-2 border-b border-gray-50 mb-1">
                                    <p className="text-xs text-gray-500">Signed in as</p>
                                    <p className="text-sm font-bold text-gray-900 truncate">{userName || 'User'}</p>
                                </div>
                                <button 
                                    onClick={() => {
                                        navigate(paths.profile);
                                        setIsUserDropdownOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
                                >
                                    <BsPerson size={16} />  
                                    Your Profile
                                </button>
                                <button 
                                    onClick={() => {
                                        handleLogout();
                                        setIsUserDropdownOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors flex items-center gap-2"
                                >
                                    <BsXLg size={14} />
                                    Sign Out
                                </button>
                            </div>
                        </>
                    )}
                </div>

                {/* Hamburger Menu Icon - Mobile Only */}
                <button 
                  onClick={() => setIsMobileMenuOpen(true)}
                  className='flex lg:hidden text-[var(--text-color)] hover:text-[var(--primary-color)] transition-colors cursor-pointer'
                >
                    <BsList size={28} />
                </button>
            </div>
        </div>

        {/* Mobile Drawer Overlay */}
        {isMobileMenuOpen && (
            <div 
              className='fixed inset-0 bg-black/50 z-[200] lg:hidden transition-opacity duration-300'
              onClick={() => setIsMobileMenuOpen(false)}
            />
        )}

        {/* Mobile Drawer Content */}
        <div className={`fixed top-0 right-0 h-full w-[85%] max-w-[320px] bg-white z-[201] lg:hidden transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <div className='flex flex-col h-full'>
                {/* Drawer Header */}
                <div className='flex items-center justify-between p-5 border-b'>
                    <img className='h-8 object-contain' src={appLogo} alt="Greentic Logo" />
                    <button onClick={() => setIsMobileMenuOpen(false)} className='text-gray-500 hover:text-black'>
                        <BsXLg size={22} />
                    </button>
                </div>

                {/* Language Selector */}
                <div className='p-5 border-b'>
                    <div className='relative w-full border rounded-lg px-4 py-2 flex items-center justify-between text-gray-700 cursor-pointer'>
                        <span className='text-sm font-medium'>English</span>
                        <BsChevronDown size={14} />
                    </div>
                </div>

                {/* Drawer Links */}
                <div className='flex-1 overflow-y-auto p-4 space-y-2'>
                    {navLinks.map((link, index) => (
                        <div 
                            key={index}
                            onClick={() => {
                                navigate(link.path);
                                setIsMobileMenuOpen(false);
                            }}
                            className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 cursor-pointer group ${index === 0 ? 'bg-green-50 text-[var(--primary-color)]' : 'text-slate-600 hover:bg-gray-50'}`}
                        >
                            <div className={`p-2 rounded-lg ${index === 0 ? 'text-[var(--primary-color)]' : 'text-slate-400 group-hover:text-slate-600'}`}>
                                <BsLink45Deg size={24} />
                            </div>
                            <span className='font-semibold text-[17px]'>{link.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </div>
  );
};

export default Navbar;