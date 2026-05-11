import React from 'react';
import { HiX, HiTrash, HiMinus, HiPlus } from 'react-icons/hi';
import FilterButton from '../ui/FilterButton';
import { BiTrash } from 'react-icons/bi';

const CartSidebar = ({ isOpen, onClose }) => {
  const cartItems = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1566842637044-173b7427292d?q=80&w=2000&auto=format&fit=crop",
      name: "Parle's Wafers",
      price: 50.0,
      quantity: 1
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1610348725531-843dff563e2c?q=80&w=2070&auto=format&fit=crop",
      name: "Fresh Onion",
      price: 152.0,
      quantity: 1
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop",
      name: "Klaas River Salmon Fillets 500 G| Frozen",
      price: 1500.0,
      quantity: 1
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1518843875459-f738682238a6?q=80&w=2042&auto=format&fit=crop",
      name: "Fresh Tomato",
      price: 80.0,
      quantity: 1
    }
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
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
            Your Cart ({cartItems.length})
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <HiX size={24} />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-2 custom-scrollbar">
          {cartItems.map((item) => (
            <div key={item.id} className="flex gap-4 items-center pb-6 border-b border-gray-50 last:border-none">
              {/* Product Image */}
              <div className="w-24 h-24 bg-gray-50 rounded-xl flex-shrink-0 flex items-center justify-center p-2 border border-gray-100">
                <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain" />
              </div>

              {/* Product Info */}
              <div className="flex-1 flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-800 text-sm leading-tight max-w-[200px]">
                    {item.name}
                  </h3>
                  <button className="text-red-500 hover:scale-110 transition-transform">
                    <BiTrash size={20} />
                  </button>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  {/* Quantity Controls */}
                  <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden h-10">
                    <button className="px-3 hover:bg-gray-50 text-gray-500 transition-colors">
                      <HiMinus size={14} />
                    </button>
                    <span className="px-3 font-bold text-gray-900 w-6 text-center">{item.quantity}</span>
                    <button className="px-3 hover:bg-gray-50 text-gray-500 transition-colors">
                      <HiPlus size={14} />
                    </button>
                  </div>
                  
                  {/* Price */}
                  <span className="text-lg font-bold text-black">
                    ${item.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50/50 border-t border-gray-200 space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-gray-800 font-medium">
              <span>Subtotal</span>
              <span className="text-gray-900 font-bold">${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-gray-800 font-medium">
              <span>Tax</span>
              <span className="text-gray-900 font-bold">${tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-xl font-bold text-gray-900 pt-2">
              <span>Total</span>
              <span>${total.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex flex-col gap-3 pt-2">
            <FilterButton isActive={true} className="w-full py-4">
              Proceed to Checkout
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
