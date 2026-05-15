import React, { useState, useEffect } from 'react';
import SectionHeader from '../ui/SectionHeader';

const AffiliateTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Placeholder for dynamic data fetching
        const fetchTransactions = async () => {
            try {
                // Simulating API call
                setTimeout(() => {
                    setTransactions([]); // Setting empty for now as per design
                    setLoading(false);
                }, 1000);
            } catch (err) {
                console.error("Error fetching transactions:", err);
                setLoading(false);
            }
        };
        fetchTransactions();
    }, []);

    return (
        <div className="bg-[var(--bg-gray-soft)] rounded-2xl border border-[var(--border-color)] p-8">
            <h2 className="text-2xl font-bold text-[var(--text-main)] mb-8">Affiliate Transactions</h2>
            
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[var(--primary-light)] text-[var(--text-main)]">
                            <th className="px-6 py-4 font-bold text-sm">#</th>
                            <th className="px-6 py-4 font-bold text-sm">Customer Name</th>
                            <th className="px-6 py-4 font-bold text-sm">Order ID</th>
                            <th className="px-6 py-4 font-bold text-sm">Order Price</th>
                            <th className="px-6 py-4 font-bold text-sm">Commission (%)</th>
                            <th className="px-6 py-4 font-bold text-sm">Commission Amount</th>
                        </tr>
                    </thead>
                    <tbody className="">
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-10 text-center text-[var(--text-muted)]">
                                    Loading transactions...
                                </td>
                            </tr>
                        ) : transactions.length > 0 ? (
                            transactions.map((item, index) => (
                                <tr key={item.id} className="border-b border-[var(--border-color)] hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 text-sm">{index + 1}</td>
                                    <td className="px-6 py-4 text-sm font-medium">{item.customerName}</td>
                                    <td className="px-6 py-4 text-sm">{item.orderId}</td>
                                    <td className="px-6 py-4 text-sm font-semibold">₹{item.orderPrice}</td>
                                    <td className="px-6 py-4 text-sm">{item.commissionPercent}%</td>
                                    <td className="px-6 py-4 text-sm font-bold text-[var(--primary-color)]">₹{item.commissionAmount}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-10 text-center text-[var(--text-muted)]">
                                    No transactions found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AffiliateTransactions;
