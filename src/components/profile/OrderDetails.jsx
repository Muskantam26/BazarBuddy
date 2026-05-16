import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaCircleCheck, FaCircle, FaDownload, FaMessage } from 'react-icons/fa6';
import Button1 from '../ui/Button1';
import paths from '../../path/path';
import { products as mockProducts } from '../../data/mockData';

const OrderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        // Mock data
        const mockOrder = {
            _id: id,
            orderId: "ORD-12345",
            createdAt: new Date().toISOString(),
            status: "Delivered",
            grandTotal: 1250.00,
            spv: 125,
            shippingAddress: {
                fullName: "Mock User",
                address: "123 Mock Street",
                city: "Mock City",
                state: "Mock State",
                pincode: "123456",
                mobile: "1234567890",
                addressType: "Home"
            },
            items: [
                {
                    _id: "item1",
                    productName: "Fresh Onion",
                    quantity: 2,
                    unitPrice: 76.00,
                    totalPrice: 152.00,
                    image: "https://via.placeholder.com/150",
                    product: {
                        name: "Fresh Onion",
                        brand: "Local Farm"
                    }
                }
            ]
        };

        setTimeout(() => {
            setOrder(mockOrder);
            setLoading(false);
        }, 500);
    }, [id]);

    if (loading) { 
        return (
            <div className="flex flex-col items-center justify-center p-20 bg-white rounded-2xl border border-gray-100">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary-color)]"></div>
                <p className="mt-4 text-gray-500">Loading order details...</p>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="text-center p-20 bg-white rounded-2xl border border-gray-100">
                <p className="text-gray-500 mb-4">Order not found.</p>
                <Button1 onClick={() => navigate(paths.profileOrders)}>Back to Orders</Button1>
            </div>
        );
    }

    const status = order.orderStatus || order.status || 'Processing';
    const address = order.shippingAddress || order.address || {};

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center gap-4 mb-2">
                <button 
                    onClick={() => navigate(-1)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <FaChevronLeft className="text-gray-600" />
                </button>
                <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
            </div>

            <div className="flex flex-col xl:flex-row gap-6">
                {/* Main Content */}
                <div className="flex-1 space-y-6">
                    {/* Items Card */}
                    <div className="space-y-4">
                        {order.items?.map((item, index) => {
                            let product = item.product || {};
                            
                            // Fallback: resolve product details from mockData if missing
                            if (!item.productImage && (!product.images || product.images.length === 0)) {
                                const found = mockProducts.find(p => p.name === item.productName || p._id === item.productId || p.id === item.productId);
                                if (found) product = found;
                            }

                            return (
                                <div key={item._id || index} className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
                                    <div className="p-6">
                                        <div className="flex gap-6">
                                            <div className="w-24 h-28 bg-gray-50 rounded-lg overflow-hidden border border-gray-100 flex-shrink-0">
                                                <img 
                                                    src={item.productImage || product.images?.[0] || product.image || 'https://via.placeholder.com/150'} 
                                                    alt={item.productName || 'Product'} 
                                                    className="w-full h-full object-contain"
                                                />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <div className="flex justify-between items-start">
                                                    <div className="inline-block px-2 py-0.5 bg-gray-100 text-[10px] font-bold text-gray-500 rounded uppercase mb-1">
                                                        {status.toUpperCase()}
                                                    </div>
                                                </div>
                                                <h2 className="text-lg font-medium text-gray-900 leading-tight">
                                                    {item.productName}
                                                </h2>
                                                <div className="text-sm text-gray-500">
                                                    {item.variant && <span>Variant: {item.variant}, </span>}
                                                    {item.quantity && <span>Qty: {item.quantity}</span>}
                                                </div>
                                                {product.brand && <p className="text-xs text-gray-400">Brand: {product.brand}</p>}
                                                <div className="flex items-center gap-2 mt-2">
                                                    <span className="text-lg font-bold text-gray-900">₹{item.totalPrice}</span>
                                                    <span className="text-xs text-gray-400">(₹{item.unitPrice} per unit)</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Timeline (only for first item or shared) */}
                                        {index === 0 && (
                                            <div className="mt-8 border-t border-gray-50 pt-8 px-2">
                                                <div className="relative">
                                                    <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gray-100"></div>
                                                    <div className="space-y-8 relative z-10">
                                                        <div className="flex items-start gap-4">
                                                            <FaCircleCheck className="text-green-500 bg-white rounded-full text-xl flex-shrink-0" />
                                                            <div className="space-y-0.5">
                                                                <p className="text-sm font-bold text-gray-900">Order Placed, {new Date(order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-start gap-4">
                                                            <FaCircleCheck className={`text-xl flex-shrink-0 bg-white rounded-full ${status.toLowerCase() === 'delivered' ? 'text-green-500' : 'text-gray-200'}`} />
                                                            <div className="space-y-0.5">
                                                                <p className={`text-sm font-bold ${status.toLowerCase() === 'delivered' ? 'text-gray-900' : 'text-gray-400'}`}>
                                                                    {status.toLowerCase() === 'delivered' ? `Delivered, ${new Date(order.updatedAt || order.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}` : 'Expected Delivery'}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    
                    <div className="p-4 bg-white rounded-xl border border-gray-100 text-xs text-gray-400">
                        Order #{order._id}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="w-full xl:w-80 space-y-6">
                    {/* Delivery Details */}
                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm p-6">
                        <h3 className="text-sm font-bold text-gray-900 mb-4">Delivery details</h3>
                        <div className="space-y-4">
                            <div className="flex gap-3">
                                <div className="mt-1 flex-shrink-0">
                                    <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-[10px] text-gray-500">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-gray-900">{address.addressType || 'Home'}</p>
                                    <p className="text-[11px] text-gray-500 leading-relaxed">
                                        {address.address || 'Address not available'}, {address.city || ''}, {address.state || ''} - {address.pincode || ''}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                <div className="mt-1 flex-shrink-0">
                                    <div className="w-5 h-5 bg-gray-100 rounded-full flex items-center justify-center text-[10px] text-gray-500">
                                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs font-bold text-gray-900">{address.fullName || address.name || 'User'}</p>
                                    <p className="text-[11px] text-gray-500">{address.mobile || address.phone || ''}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Price Details */}
                    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm p-6">
                        <h3 className="text-sm font-bold text-gray-900 mb-4">Price details</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between text-xs text-gray-600">
                                <span>Selling price</span>
                                <span>₹{order.grandTotal}</span>
                            </div>
                            <div className="flex justify-between text-xs text-gray-600">
                                <div className="flex items-center gap-1">
                                    Points Earned
                                </div>
                                <span>{order.spv || 0} SPV</span>
                            </div>
                            <div className="pt-3 border-t border-dashed border-gray-200 flex justify-between items-center">
                                <span className="text-sm font-bold text-gray-900">Total amount</span>
                                <span className="text-sm font-bold text-gray-900">₹{order.grandTotal}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;
