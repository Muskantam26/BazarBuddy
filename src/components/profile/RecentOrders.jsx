import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SectionHeader from '../ui/SectionHeader';
import { getMyDashboardOrdersApi } from '../../api/Order-api';
import OrderCard from './OrderCard';
import paths from '../../path/path';
import toast from 'react-hot-toast';

const RecentOrders = () => {
    const navigate = useNavigate();
    const [recentOrders, setRecentOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRecentOrders = async () => {
            try {
                const res = await getMyDashboardOrdersApi({ page: 1, limit: 5 });
                if (res.success || res.status === 'success') {
                    const ordersData = Array.isArray(res.data) 
                        ? res.data 
                        : (res.data?.orders || res.orders || []);
                    setRecentOrders(ordersData);
                }
            } catch (err) {
                console.error("Error fetching recent orders:", err);
                toast.error("Failed to load recent orders");
            } finally {
                setLoading(false);
            }
        };
        fetchRecentOrders();
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
