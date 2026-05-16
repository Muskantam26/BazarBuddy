import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionHeader from '../ui/SectionHeader';
import OrderCard from './OrderCard';
import paths from '../../path/path';

const RecentOrders = () => {
    const navigate = useNavigate();
    const [recentOrders, setRecentOrders] = useState([
        {
            _id: "order1",
            orderId: "ORD-12345",
            createdAt: new Date().toISOString(),
            status: "Delivered",
            grandTotal: 1250.00,
            items: [
                { productName: "Fresh Onion", quantity: 2, sellingPrice: 152.00 }
            ]
        }
    ]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Mock loading
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    return (
        <div className="bg-[var(--bg-gray-soft)] rounded-2xl  border border-[var(--border-color)] p-8">
            <SectionHeader 
                title="Recent Orders" 
                linkText="View All Orders" 
                onClick={() => navigate(paths.profileOrders)}
            />
            
            <div className="space-y-4">
                {loading ? (
                    <div className="space-y-4">
                        {[...Array(2)].map((_, i) => (
                            <div key={i} className="h-32 bg-white rounded-xl border border-gray-100 animate-pulse"></div>
                        ))}
                    </div>
                ) : recentOrders.length > 0 ? (
                    recentOrders.map((order) => (
                        <OrderCard key={order._id} order={order} />
                    ))
                ) : (
                    <div className="bg-white rounded-xl border border-gray-100 p-8 text-center text-[var(--text-color)]">
                        No recent orders found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecentOrders;
