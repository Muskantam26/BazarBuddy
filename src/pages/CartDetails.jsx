import React, { useState, useEffect } from 'react';
import PageHeader from '../components/ui/PageHeader';
import { getCartItems, addToCart, removeCartItem } from '../api/Cart-api';
import { backendConfig } from '../constants/constant/Maincontent';
import { HiTrash, HiMinus, HiPlus, HiArrowLeft } from 'react-icons/hi';
import { BiTrash } from 'react-icons/bi';
import { BsCart3 } from 'react-icons/bs';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import paths from '../path/path';

const CartDetails = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      setLoading(true);
      const res = await getCartItems();
      if (res.success || res.status === 'success') {
        const items = res.items || 
                      res.data?.items || 
                      res.cart?.items || 
                      res.data?.cart?.items || 
                      (Array.isArray(res.data) ? res.data : []);
        setCartItems(Array.isArray(items) ? items : []);
      }
    } catch (error) {
      console.error("Fetch cart error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const res = await addToCart(productId, newQuantity);
      if (res.success) {
        fetchCartItems();
        window.dispatchEvent(new Event('cartUpdated'));
      }
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const res = await removeCartItem(productId);
      if (res.success) {
        toast.success("Item removed");
        fetchCartItems();
        window.dispatchEvent(new Event('cartUpdated'));
      }
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const subtotal = cartItems.reduce((acc, item) => {
    const product = item.productId || item.product || {};
    const price = parseFloat(product.sellingPrice) || parseFloat(product.price) || 0;
    return acc + (price * item.quantity);
  }, 0);

  const total = subtotal; // Assuming no tax/shipping for now

  if (loading && cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[var(--bg-gray-soft)]">
        <PageHeader title="Cart Details" />
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary-color)]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-gray-soft)] pb-20">
      <PageHeader title="Cart Details" />
      
      <div className="container mx-auto px-4 mt-10">
        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <div className="mb-6 flex justify-center">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                <BsCart3 size={40} />
              </div>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Add some fresh products to your cart and they will show up here.</p>
            <button 
              onClick={() => navigate(paths.home)}
              className="px-8 py-3 bg-[var(--primary-color)] text-white rounded-xl font-bold hover:bg-[var(--primary-dark)] transition-all shadow-lg shadow-green-100"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Table Section */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
                {/* Table Header */}
                <div className="bg-[var(--primary-color)] text-white grid grid-cols-12 gap-4 p-4 font-bold text-sm md:text-base">
                  <div className="col-span-5 md:col-span-4">Product</div>
                  <div className="hidden md:block col-span-3 text-center">Barcode</div>
                  <div className="col-span-3 md:col-span-2 text-center">Quantity</div>
                  <div className="col-span-2 md:col-span-1 text-right">Price</div>
                  <div className="col-span-2 md:col-span-2 text-right">Subtotal</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-50">
                  {cartItems.map((item) => {
                    const product = (item.productId && typeof item.productId === 'object') ? item.productId : 
                                    (item.product && typeof item.product === 'object') ? item.product : {};
                    const productImage = product.image || product.img || product.images?.[0];
                    const productName = product.name || 'Product';
                    const productPrice = parseFloat(product.sellingPrice) || parseFloat(product.price) || 0;
                    const oldPrice = parseFloat(product.mrp) || parseFloat(product.oldPrice) || productPrice * 1.2;

                    return (
                      <div key={item._id || product._id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors">
                        {/* Product Info */}
                        <div className="col-span-5 md:col-span-4 flex items-center gap-3 md:gap-4">
                          <button 
                            onClick={() => {
                                const id = product._id || product.id || (typeof item.productId === 'string' ? item.productId : item.productId?._id);
                                handleRemoveItem(id);
                            }}
                            className="p-2 text-red-500 border border-red-100 rounded-lg hover:bg-red-50 transition-all flex-shrink-0"
                          >
                            <HiTrash size={18} />
                          </button>
                          <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-xl border border-gray-100 p-2 flex-shrink-0 flex items-center justify-center">
                            <img 
                              src={productImage?.startsWith('http') ? productImage : `${backendConfig.origin}/${productImage}`} 
                              alt={productName} 
                              className="max-h-full max-w-full object-contain" 
                            />
                          </div>
                          <h3 className="font-bold text-gray-800 text-xs md:text-sm line-clamp-2">{productName}</h3>
                        </div>

                        {/* Barcode - Visual Placeholder */}
                        <div className="hidden md:flex col-span-3 justify-center">
                          <div className="flex gap-[2px] items-center">
                            {[2, 1, 3, 2, 4, 1, 2, 3, 1, 4, 2, 1, 3].map((w, i) => (
                              <div key={i} className="bg-black h-8" style={{ width: `${w}px` }}></div>
                            ))}
                          </div>
                        </div>

                        {/* Quantity */}
                        <div className="col-span-3 md:col-span-2 flex justify-center">
                          <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden shadow-sm h-10">
                            <button 
                              onClick={() => {
                                const id = product._id || product.id || (typeof item.productId === 'string' ? item.productId : item.productId?._id);
                                handleUpdateQuantity(id, item.quantity - 1);
                              }}
                              className="px-2 md:px-3 hover:bg-gray-50 text-gray-500 transition-colors"
                            >
                              <HiMinus size={14} />
                            </button>
                            <span className="px-2 md:px-3 font-bold text-gray-900 min-w-[20px] text-center text-sm">{item.quantity}</span>
                            <button 
                              onClick={() => {
                                const id = product._id || product.id || (typeof item.productId === 'string' ? item.productId : item.productId?._id);
                                handleUpdateQuantity(id, item.quantity + 1);
                              }}
                              className="px-2 md:px-3 hover:bg-gray-50 text-gray-500 transition-colors"
                            >
                              <HiPlus size={14} />
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="col-span-2 md:col-span-1 text-right">
                          <div className="text-[10px] md:text-xs text-gray-400 line-through">₹{oldPrice.toFixed(1)}</div>
                          <div className="text-xs md:text-sm font-bold text-gray-800 border-b-2 border-[var(--primary-color)] inline-block">₹{productPrice.toFixed(1)}</div>
                        </div>

                        {/* Subtotal */}
                        <div className="col-span-2 md:col-span-2 text-right font-bold text-gray-900 text-sm md:text-base">
                          ₹{(productPrice * item.quantity).toFixed(1)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="flex flex-wrap justify-between items-center mt-6 gap-4">
                <button 
                  onClick={() => navigate(paths.home)}
                  className="flex items-center gap-2 text-[var(--primary-color)] font-bold hover:translate-x-[-4px] transition-transform"
                >
                  <HiArrowLeft size={20} />
                  Continue Shopping
                </button>
                <button 
                  className="flex items-center gap-2 text-gray-500 font-bold hover:text-red-500 transition-colors"
                  onClick={() => {
                    // Logic to clear cart could be added here
                    toast.error("Clear cart feature coming soon");
                  }}
                >
                  <BiTrash size={20} />
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary Section */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8 sticky top-24">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 font-medium">Subtotal</span>
                    <span className="text-gray-900 font-bold text-lg">₹{subtotal.toLocaleString(undefined, {minimumFractionDigits: 1})}</span>
                  </div>
                  <div className="h-[1px] bg-gray-100 w-full"></div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-900 font-bold text-lg">Total</span>
                    <span className="text-[var(--primary-color)] font-extrabold text-2xl">₹{total.toLocaleString(undefined, {minimumFractionDigits: 1})}</span>
                  </div>
                </div>

                <button 
                  className="w-full py-4 bg-[var(--primary-color)] text-white rounded-xl font-extrabold text-lg shadow-lg shadow-green-100 hover:bg-[var(--primary-dark)] hover:scale-[1.02] transition-all transform active:scale-95 flex items-center justify-center gap-2"
                  onClick={() => navigate(paths.checkout)}
                >
                  Proceed to Checkout
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartDetails;