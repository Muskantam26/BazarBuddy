import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import FilterDropdown from '../ui/FilterDropdown';
import { getMyDashboardOrdersApi } from '../../api/Order-api';
import OrderCard from './OrderCard';
import toast from 'react-hot-toast';

const OrderHistory = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedFilter, setSelectedFilter] = useState("All Orders");
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const filterOptions = ["All Orders", "Placed", "Processing", "Delivered", "Cancelled", "Return", "Confirmed"];

    useEffect(() => {
        const fetchOrders = async () => {
            setLoading(true);
            try {
                const filter = selectedFilter === "All Orders" ? "" : selectedFilter;
                const res = await getMyDashboardOrdersApi({ page, limit: 10, status: filter });
                if (res.success || res.status === 'success') {
                    const ordersData = Array.isArray(res.data) 
                        ? res.data 
                        : (res.data?.orders || res.orders || []);
                    setOrders(ordersData);
                    setTotalPages(res.data?.pagination?.totalPages || res.totalPages || res.data?.totalPages || 1);
                }
            } catch (err) {
                console.error("Error fetching orders:", err);
                toast.error("Failed to load order history");
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, [page, selectedFilter]);

    const handlePrev = () => setPage(p => Math.max(1, p - 1));
    const handleNext = () => setPage(p => Math.min(totalPages, p + 1));

    return (
        <div className="bg-[var(--bg-gray-soft)] rounded-2xl border border-[var(--border-color)] p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold text-[var(--text-main)]">Order History</h2>
                
                <FilterDropdown 
                    placeholder="Filter"
                    options={filterOptions}
                    selected={selectedFilter}
                    onSelect={setSelectedFilter}
                />
            </div>

            <div className="space-y-4 mb-8">
                {loading ? (
                    <div className="space-y-4">
                        {[...Array(3)].map((_, i) => (
                            <div key={i} className="h-32 bg-white rounded-xl border border-gray-100 animate-pulse"></div>
                        ))}
                    </div>
                ) : orders.length > 0 ? (
                    orders.map((order) => (
                        <OrderCard key={order._id} order={order} />
                    ))
                ) : (
                    <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
                        <p className="text-[var(--text-muted)] italic">No orders found matching your criteria.</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 pt-4">
                    <button 
                        onClick={handlePrev}
                        disabled={page === 1}
                        className="w-10 h-10 flex items-center justify-center rounded-lg border border-[var(--border-color)] text-[var(--text-color)] hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <FaChevronLeft className="text-xs" />
                    </button>
                    
                    {[...Array(totalPages)].map((_, i) => (
                        <button
                            key={i + 1}
                            onClick={() => setPage(i + 1)}
                            className={`w-10 h-10 flex items-center justify-center rounded-lg font-bold text-sm transition-all ${
                                page === i + 1 
                                    ? 'bg-[var(--primary-color)] text-white shadow-md' 
                                    : 'border border-[var(--border-color)] text-[var(--text-color)] hover:border-[var(--primary-color)]'
                            }`}
                        >
                            {i + 1}
                        </button>
                    ))}

                    <button 
                        onClick={handleNext}
                        disabled={page === totalPages}
                        className="w-10 h-10 flex items-center justify-center rounded-lg border border-[var(--border-color)] text-[var(--text-color)] hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <FaChevronRight className="text-xs" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default OrderHistory;
