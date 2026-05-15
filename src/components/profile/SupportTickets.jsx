import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPencil, FaShare, FaTrash, FaChevronLeft, FaChevronRight } from 'react-icons/fa6';
import Button1 from '../ui/Button1';
import paths from '../../path/path';
import toast from 'react-hot-toast';

const SupportTickets = () => {
    const navigate = useNavigate();
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        // Placeholder for dynamic fetching
        const fetchTickets = async () => {
            try {
                // Simulating API call with dummy data
                setTimeout(() => {
                    setTickets([
                        {
                            _id: 't1',
                            title: 'For Refund',
                            ticketId: '#1749209085',
                            orderId: '#020260106155027657',
                            customer: 'greentic Example',
                            status: 'open'
                        }
                    ]);
                    setLoading(false);
                    setTotalPages(1);
                }, 800);
            } catch (err) {
                console.error("Error fetching tickets:", err);
                setLoading(false);
            }
        };
        fetchTickets();
    }, [page]);

    const handleAction = (action, id) => {
        toast.success(`${action} action triggered for ${id}`);
    };

    return (
        <div className="bg-[var(--white)] rounded-2xl border border-[var(--border-color)] p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold text-[var(--text-main)]">Support Ticket</h2>
                <Button1 className="flex items-center gap-2 px-6">
                    <span className="text-xl">+</span> Add Ticket
                </Button1>
            </div>

            <div className="overflow-x-auto mb-8">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-[var(--primary-light)] text-[var(--text-main)]">
                            <th className="px-6 py-4 font-bold text-sm">Title</th>
                            <th className="px-6 py-4 font-bold text-sm">Ticket Id</th>
                            <th className="px-6 py-4 font-bold text-sm">Order Id</th>
                            <th className="px-6 py-4 font-bold text-sm">Customer</th>
                            <th className="px-6 py-4 font-bold text-sm">Status</th>
                            <th className="px-6 py-4 font-bold text-sm text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--border-color)]">
                        {loading ? (
                            <tr>
                                <td colSpan="6" className="px-6 py-10 text-center text-[var(--text-muted)]">
                                    Loading tickets...
                                </td>
                            </tr>
                        ) : tickets.length > 0 ? (
                            tickets.map((ticket) => (
                                <tr key={ticket._id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-[var(--text-main)] text-sm">
                                        {ticket.title}
                                    </td>
                                    <td className="px-6 py-4 text-[var(--text-color)] text-sm font-medium">
                                        {ticket.ticketId}
                                    </td>
                                    <td className="px-6 py-4 text-[var(--text-color)] text-sm font-medium">
                                        {ticket.orderId}
                                    </td>
                                    <td className="px-6 py-4 text-[var(--text-main)] text-sm font-bold">
                                        {ticket.customer}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 bg-green-50 text-[var(--primary-color)] border border-[var(--primary-color)] rounded-md text-xs font-medium lowercase">
                                            {ticket.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <button 
                                                onClick={() => handleAction('Edit', ticket._id)}
                                                className="w-8 h-8 rounded-lg bg-[var(--primary-color)] text-white flex items-center justify-center hover:bg-[var(--primary-dark)] transition-colors"
                                            >
                                                <FaPencil size={14} />
                                            </button>
                                            <button 
                                                onClick={() => handleAction('Reply', ticket._id)}
                                                className="w-8 h-8 rounded-lg bg-[var(--primary-color)] text-white flex items-center justify-center hover:bg-[var(--primary-dark)] transition-colors"
                                            >
                                                <FaShare size={14} />
                                            </button>
                                            <button 
                                                onClick={() => handleAction('Delete', ticket._id)}
                                                className="w-8 h-8 rounded-lg bg-[var(--primary-color)] text-white flex items-center justify-center hover:bg-[var(--primary-dark)] transition-colors"
                                            >
                                                <FaTrash size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="px-6 py-20 text-center text-[var(--text-muted)]">
                                    No support tickets found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination */}
            {totalPages >= 1 && (
                <div className="flex justify-center items-center gap-2">
                    <button 
                        onClick={() => setPage(p => Math.max(1, p - 1))}
                        disabled={page === 1}
                        className="w-10 h-10 flex items-center justify-center rounded-lg border border-[var(--border-color)] text-[var(--text-color)] hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] disabled:opacity-50 transition-all"
                    >
                        <FaChevronLeft className="text-xs" />
                    </button>
                    
                    <button
                        className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--primary-color)] text-white font-bold text-sm shadow-md"
                    >
                        {page}
                    </button>

                    <button 
                        onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                        disabled={page === totalPages}
                        className="w-10 h-10 flex items-center justify-center rounded-lg border border-[var(--border-color)] text-[var(--text-color)] hover:border-[var(--primary-color)] hover:text-[var(--primary-color)] disabled:opacity-50 transition-all"
                    >
                        <FaChevronRight className="text-xs" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default SupportTickets;
