import React, { useState, useEffect } from 'react';

const Payouts = () => {
    const [payoutData, setPayoutData] = useState({
        totalEarned: 0,
        paidAmount: 0,
        pending: 0
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Placeholder for dynamic data fetching
        const fetchPayouts = async () => {
            try {
                // Simulating API call
                setTimeout(() => {
                    setPayoutData({
                        totalEarned: 0,
                        paidAmount: 0,
                        pending: 0
                    });
                    setLoading(false);
                }, 800);
            } catch (err) {
                console.error("Error fetching payouts:", err);
                setLoading(false);
            }
        };
        fetchPayouts();
    }, []);

    const cards = [
        {
            label: 'Total Earned',
            amount: payoutData.totalEarned,
            colorClass: 'text-[var(--text-main)]'
        },
        {
            label: 'Paid Amount',
            amount: payoutData.paidAmount,
            colorClass: 'text-[var(--primary-color)]'
        },
        {
            label: 'Pending',
            amount: payoutData.pending,
            colorClass: 'text-[var(--accent-color)]'
        }
    ];

    return (
        <div className="bg-[var(--bg-gray-soft)] rounded-2xl border border-[var(--border-color)] p-8">
            <h2 className="text-2xl font-bold text-[var(--text-main)] mb-8">Payouts</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((card) => (
                    <div 
                        key={card.label}
                        className="bg-white border border-[var(--border-color)] rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        <p className="text-[var(--text-muted)] text-sm mb-2">{card.label}</p>
                        <p className={`text-2xl font-black ${card.colorClass}`}>
                            ₹{card.amount}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Payouts;
