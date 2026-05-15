import React, { useState, useEffect } from 'react';
import Button1 from '../ui/Button1';
import { getUserAddressApi } from '../../api/Address-api';
import toast from 'react-hot-toast';
import AddressForm from '../address/AddressForm';

const ManageAddresses = () => {
    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showAddForm, setShowAddForm] = useState(false);

    const fetchAddresses = async () => {
        try {
            setLoading(true);
            const response = await getUserAddressApi();
            // Handle different response formats
            const addressList = response?.data?.addresses || response?.addresses || (Array.isArray(response?.data) ? response.data : []);
            setAddresses(addressList);
        } catch (error) {
            console.error("Error fetching addresses:", error);
            toast.error("Failed to load addresses");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
    }, []);

    const handleSetDefault = (id) => {
        // Placeholder for set default logic
        toast.success("Address set as default");
    };

    const handleRemove = (id) => {
        // Placeholder for remove logic
        toast.success("Address removed successfully");
    };

    const handleAddSuccess = () => {
        setShowAddForm(false);
        fetchAddresses();
    };

    return (
        <div className="bg-[var(--bg-gray-soft)] rounded-2xl border border-[var(--border-color)] p-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h2 className="text-2xl font-bold text-[var(--text-main)]">Your Addresses</h2>
                {!showAddForm && (
                    <Button1 
                        onClick={() => setShowAddForm(true)}
                        className="flex items-center gap-2 px-6"
                    >
                        <span className="text-xl">+</span> Add New Address
                    </Button1>
                )}
            </div>

            {showAddForm ? (
                <div className="bg-white border border-[var(--border-color)] rounded-xl p-8 mb-8 shadow-sm animate-in slide-in-from-top duration-300">
                    <h3 className="text-lg font-bold text-[var(--text-main)] mb-6">Add New Address</h3>
                    <AddressForm 
                        onSuccess={handleAddSuccess}
                        onCancel={() => setShowAddForm(false)}
                    />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {loading ? (
                    <div className="col-span-full py-10 text-center text-[var(--text-muted)]">
                        Loading your addresses...
                    </div>
                ) : addresses.length > 0 ? (
                    addresses.map((addr) => (
                        <div 
                            key={addr._id} 
                            className="bg-white border border-[var(--border-color)] rounded-xl p-6 relative group hover:shadow-md transition-shadow duration-300"
                        >
                            {addr.isDefault && (
                                <span className="absolute top-4 right-4 bg-[var(--primary-color)] text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                                    Default
                                </span>
                            )}
                            
                            <div className="space-y-1 mb-6">
                                <h3 className="font-bold text-[var(--text-main)]">
                                    {(addr.shipping?.fullName || addr.fullName || addr.name)}
                                </h3>
                                <p className="text-sm text-[var(--text-color)] leading-relaxed">
                                    {(addr.shipping?.addressLine1 || addr.addressLine1)}, {(addr.shipping?.city || addr.city)},<br />
                                    {(addr.shipping?.state || addr.state)}, {(addr.shipping?.postalCode || addr.pincode)}<br />
                                    {(addr.shipping?.country || addr.country || 'India')}
                                </p>
                                <p className="text-sm text-[var(--text-color)] pt-2">
                                    <span className="font-medium">Phone:</span> {(addr.shipping?.phone || addr.phone || addr.mobile)}
                                </p>
                            </div>

                            <div className="flex items-center gap-4 text-sm font-medium border-t border-gray-100 pt-4">
                                <button className="text-[var(--primary-color)] hover:underline cursor-pointer">
                                    Edit
                                </button>
                                {!addr.isDefault && (
                                    <>
                                        <div className="w-[1px] h-3 bg-gray-300"></div>
                                        <button 
                                            onClick={() => handleRemove(addr._id)}
                                            className="text-[var(--red-color)] hover:underline cursor-pointer"
                                        >
                                            Remove
                                        </button>
                                        <div className="w-[1px] h-3 bg-gray-300"></div>
                                        <button 
                                            onClick={() => handleSetDefault(addr._id)}
                                            className="text-[var(--primary-color)] hover:underline cursor-pointer"
                                        >
                                            Set as Default
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-10 text-center text-[var(--text-muted)] border-2 border-dashed border-[var(--border-color)] rounded-xl">
                        No addresses saved yet. Click the button above to add one!
                    </div>
                )}
            </div>
        )}
    </div>
    );
};

export default ManageAddresses;
