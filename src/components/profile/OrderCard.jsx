import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCircle, FaStar } from 'react-icons/fa6';
import paths from '../../path/path';
import { products as mockProducts } from '../../data/mockData';

const OrderCard = ({ order }) => {
    const navigate = useNavigate();
    
    const item = order.items?.[0] || {};
    let product = item.product || {};
    
    // Fallback: resolve product details from mockData if missing
    if (!item.productImage && (!product.images || product.images.length === 0)) {
        const found = mockProducts.find(p => p.name === item.productName || p._id === item.productId || p.id === item.productId);
        if (found) product = found;
    }
    
    const status = order.orderStatus || order.status || 'Processing';
    
    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'delivered': return 'text-green-500';
            case 'cancelled': return 'text-red-500';
            case 'placed': return 'text-blue-500';
            case 'processing': return 'text-blue-500';
            case 'confirmed': return 'text-emerald-500';
            case 'shipped': return 'text-orange-500';
            case 'return': return 'text-gray-500';
            default: return 'text-blue-500';
        }
    };

    const getStatusText = (status, date) => {
        if (status.toLowerCase() === 'delivered') {
            return `Delivered on ${new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
        }
        return status.charAt(0).toUpperCase() + status.slice(1);
    };

    return (
        <div 
            onClick={() => navigate(paths.orderDetails.replace(':id', order._id))}
            className="bg-white border border-gray-100 rounded-xl p-4 md:p-6 mb-4 hover:shadow-md transition-all cursor-pointer flex flex-col md:flex-row gap-6 items-start md:items-center"
        >
            {/* Product Image */}
            <div className="relative w-20 h-24 flex-shrink-0 bg-gray-50 rounded-lg overflow-hidden border border-gray-100">
                <img 
                    src={item.productImage || product.images?.[0] || product.image || 'https://via.placeholder.com/150'} 
                    alt={item.productName || product.name || 'Product'} 
                    className="w-full h-full object-contain"
                />
                {status.toLowerCase() === 'delivered' && (
                    <div className="absolute bottom-0 left-0 right-0 bg-white/90 text-[10px] font-bold text-center py-0.5 border-t border-gray-100">
                        Exchange
                    </div>
                )}
            </div>

            {/* Product Info */}
            <div className="flex-1 min-w-0">
                <h3 className="text-[15px] font-medium text-gray-900 truncate mb-1">
                    {item.productName || product.name || `Order #${order._id.slice(-6)}`}
                </h3>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500">
                    {item.variant && <span>Variant: {item.variant}</span>}
                    {item.quantity && <span>Qty: {item.quantity}</span>}
                    {product.brand && <span>Brand: {product.brand}</span>}
                </div>
            </div>

            {/* Price */}
            <div className="md:w-32">
                <span className="text-lg font-bold text-gray-900">₹{order.grandTotal || order.totalPrice || 0}</span>
            </div>

            {/* Status & Actions */}
            <div className="md:w-56 flex flex-col items-start md:items-end gap-2">
                <div className="flex items-center gap-2">
                    <FaCircle className={`text-[8px] ${getStatusColor(status)}`} />
                    <span className="text-sm font-bold text-gray-900">
                        {getStatusText(status, order.updatedAt || order.createdAt)}
                    </span>
                </div>
                <p className="text-xs text-gray-500">
                    {status.toLowerCase() === 'delivered' ? 'Your item has been delivered' : `Order is ${status.toLowerCase()}`}
                </p>
                
                {status.toLowerCase() === 'delivered' && (
                    <button className="flex items-center gap-2 text-[var(--primary-color)] text-sm font-bold mt-2 hover:underline">
                        <FaStar className="text-xs" />
                        Rate & Review Product
                    </button>
                )}
            </div>
        </div>
    );
};

export default OrderCard;
