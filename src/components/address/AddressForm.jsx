import React, { useState } from 'react';
import Input from '../ui/Input';
import { addUserAddressApi } from '../../api/Address-api';
import toast from 'react-hot-toast';

const AddressForm = ({ onSuccess, onCancel, showCancel = true }) => {
    const [isSaving, setIsSaving] = useState(false);
    const [addressType, setAddressType] = useState("home");
    const [formData, setFormData] = useState({
        fullName: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        phone: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSaveAddress = async () => {
        if (
            !formData.fullName ||
            !formData.phone ||
            !formData.addressLine1 ||
            !formData.city ||
            !formData.state ||
            !formData.postalCode
        ) {
            toast.error("Please fill all required address fields");
            return;
        }

        setIsSaving(true);
        try {
            const payload = {
                shipping: {
                    fullName: formData.fullName,
                    phone: formData.phone,
                    addressLine1: formData.addressLine1,
                    addressLine2: formData.addressLine2,
                    city: formData.city,
                    state: formData.state,
                    postalCode: formData.postalCode,
                    country: "India",
                },
                billing: {
                    fullName: formData.fullName,
                    phone: formData.phone,
                    addressLine1: formData.addressLine1,
                    addressLine2: formData.addressLine2,
                    city: formData.city,
                    state: formData.state,
                    postalCode: formData.postalCode,
                    country: "India",
                },
                type: addressType,
            };
            await addUserAddressApi(payload);
            toast.success("Address saved successfully");
            if (onSuccess) onSuccess();
        } catch (err) {
            toast.error(err?.response?.data?.message || "Failed to save address");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="space-y-4 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500">Full Name *</label>
                    <Input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[var(--bg-gray-soft)] border border-[var(--border-color)] rounded-xl focus:ring-2 focus:ring-[var(--primary-color)] focus:bg-white outline-none transition-all"
                        placeholder="John Doe"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500">Phone *</label>
                    <Input
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[var(--bg-gray-soft)] border border-[var(--border-color)] rounded-xl focus:ring-2 focus:ring-[var(--primary-color)] focus:bg-white outline-none transition-all"
                        placeholder="10-digit mobile number"
                    />
                </div>
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold uppercase text-gray-500">Address Line 1 *</label>
                <Input
                    name="addressLine1"
                    value={formData.addressLine1}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-[var(--bg-gray-soft)] border border-[var(--border-color)] rounded-xl focus:ring-2 focus:ring-[var(--primary-color)] focus:bg-white outline-none transition-all"
                    placeholder="House No, Building, Street, Area"
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500">City *</label>
                    <Input
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[var(--bg-gray-soft)] border border-[var(--border-color)] rounded-xl focus:ring-2 focus:ring-[var(--primary-color)] focus:bg-white outline-none transition-all"
                        placeholder="City"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500">State *</label>
                    <Input
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[var(--bg-gray-soft)] border border-[var(--border-color)] rounded-xl focus:ring-2 focus:ring-[var(--primary-color)] focus:bg-white outline-none transition-all"
                        placeholder="State"
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase text-gray-500">Postal Code *</label>
                    <Input
                        name="postalCode"
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 bg-[var(--bg-gray-soft)] border border-[var(--border-color)] rounded-xl focus:ring-2 focus:ring-[var(--primary-color)] focus:bg-white outline-none transition-all"
                        placeholder="6-digit PIN code"
                    />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">
                <button
                    onClick={handleSaveAddress}
                    disabled={isSaving}
                    className="px-8 py-3 bg-[var(--primary-color)] text-white rounded-xl font-bold hover:bg-[var(--primary-dark)] transition-all shadow-lg shadow-green-100 disabled:opacity-50"
                >
                    {isSaving ? "Saving..." : "Save Address"}
                </button>
                {showCancel && (
                    <button
                        onClick={onCancel}
                        className="px-8 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-all"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </div>
    );
};

export default AddressForm;
