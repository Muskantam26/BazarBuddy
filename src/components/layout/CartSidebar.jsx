import React, { useState, useEffect } from 'react';
import { HiX, HiTrash, HiMinus, HiPlus } from 'react-icons/hi';
import FilterButton from '../ui/FilterButton';
import { BiTrash } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartItems, toggleSidebar, updateQuantity, removeItem } from '../../redux/slices/cartSlice';
import { backendConfig } from '../../constants/constant/Maincontent';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import paths from '../../path/path';
import { products as mockProducts } from '../../data/mockData';


const CartSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { items: cartItems, loading } = useSelector((state) => state.cart);
  const navigate = useNavigate();

  const loadCartData = () => {
    dispatch(fetchCartItems());
  };

  useEffect(() => {
    if (isOpen) {
      loadCartData();
    }
  }, [isOpen]);

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  const handleRemoveItem = (productId) => {
    dispatch(removeItem(productId));
    toast.success("Item removed");
  };

  const safeCartItems = Array.isArray(cartItems) ? cartItems : [];

  // Enhanced product lookup function
  const getProductDetails = (item) => {
    if (item.productId && typeof item.productId === 'object') return item.productId;
    if (item.product && typeof item.product === 'object') return item.product;
    
    // Fallback: Lookup in mock data by ID
    const id = item.productId || item.product || item.id;
    return mockProducts.find(p => p._id === id || p.id === id) || {};
  };

  const subtotal = safeCartItems.reduce((acc, item) => {
    const product = getProductDetails(item);
    const price = parseFloat(product.sellingPrice) || parseFloat(product.price) || 0;
    return acc + (price * item.quantity);
  }, 0);
  const tax = 0.0;
  const total = subtotal + tax;

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[1000] transition-opacity duration-300 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      ></div>

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-screen  w-[380px] bg-white z-[1001] shadow-2xl transform transition-transform duration-500 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'} flex flex-col`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-2 px-4 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">
            Your Cart ({safeCartItems.length})
          </h2>
          <button 
            onClick={() => dispatch(toggleSidebar(false))}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <HiX size={24} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-2 custom-scrollbar">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary-color)]"></div>
            </div>
          ) : safeCartItems.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              Your cart is empty
            </div>
          ) : (
            safeCartItems.map((item, index) => {
              const product = getProductDetails(item);
              
              // Handle various image field names
              const productImage = product.image || product.img || product.images?.[0];
              const productName = product.name || 'Product';
              const productPrice = parseFloat(product.sellingPrice) || parseFloat(product.price) || 0;
              const productId = product._id || product.id || (typeof item.productId === 'string' ? item.productId : item.productId?._id);

              return (
                <div key={item._id || productId || `cart-item-${index}`} className="flex gap-4 items-center pb-6 border-b border-gray-50 last:border-none">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gray-50 rounded-xl flex-shrink-0 flex items-center justify-center p-2 border border-gray-100">
                    <img 
                      src={productImage} 
                      alt={productName} 
                      className="max-h-full max-w-full object-contain" 
                    />
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-800 text-sm leading-tight max-w-[200px]">
                        {productName}
                      </h3>
                      <button 
                        onClick={() => handleRemoveItem(productId)}
                        className="text-red-500 hover:scale-110 transition-transform"
                      >
                        <BiTrash size={20} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-2">
                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden h-10">
                        <button 
                          onClick={() => handleUpdateQuantity(productId, item.quantity - 1)}
                          className="px-3 hover:bg-gray-50 text-gray-500 transition-colors cursor-pointer"
                        >
                          <HiMinus size={14} />
                        </button>
                        <span className="px-3 font-bold text-gray-900 w-6 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => handleUpdateQuantity(productId, item.quantity + 1)}
                          className="px-3 hover:bg-gray-50 text-gray-500 transition-colors cursor-pointer"
                        >
                          <HiPlus size={14} />
                        </button>
                      </div>
                      
                      {/* Price */}
                      <span className="text-lg font-bold text-black">
                        ₹{(productPrice * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50/50 border-t border-gray-200 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-gray-800 font-medium">
              <span>Subtotal</span>
              <span className="text-gray-900 font-bold">₹{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-800 font-medium">
              <span>Tax</span>
              <span className="text-gray-900 font-bold">₹{tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900 pt-2">
              <span>Total</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <FilterButton isActive={true} className="w-full py-4" onClick={() => { onClose(); navigate(paths.checkout); }}>
              Checkout
            </FilterButton>
            <FilterButton onClick={onClose} className="w-full py-4">
              Continue Shopping
            </FilterButton>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
