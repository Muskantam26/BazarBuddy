import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Input from '../ui/Input';
import Button1 from '../ui/Button1';

const AccountDetails = () => {
    const { user } = useSelector((state) => state.auth);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    useEffect(() => {
        if (user && user.userInformation) {
            const { name, email, mobile } = user.userInformation;
            const names = name ? name.split(' ') : ['', ''];
            setFormData(prev => ({
                ...prev,
                firstName: names[0] || '',
                lastName: names.slice(1).join(' ') || '',
                email: email || '',
                phone: mobile || ''
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder for update logic
        console.log('Update Data:', formData);
    };

    const inputClasses = "w-full px-4 py-3 border border-[var(--border-color)] rounded-xl focus:border-[var(--primary-color)] bg-white text-[var(--text-main)]";
    const labelClasses = "block text-sm font-semibold text-[var(--text-main)] mb-2";
    const requiredStar = <span className="text-red-500 ml-1">*</span>;

    return (
        <div className="bg-[var(--bg-gray-soft)] rounded-2xl border border-[var(--border-color)] p-8">
            <h2 className="text-2xl font-bold text-[var(--text-main)] mb-8">Account Details</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClasses}>First Name {requiredStar}</label>
                        <Input 
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                            className={inputClasses}
                            required
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Last Name {requiredStar}</label>
                        <Input 
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                            className={inputClasses}
                            required
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClasses}>Email Address {requiredStar}</label>
                        <Input 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Email Address"
                            className={inputClasses}
                            required
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Phone Number</label>
                        <Input 
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="Phone Number"
                            className={inputClasses}
                        />
                    </div>
                </div>

                <div className="pt-6 border-t border-[var(--border-color)]">
                    <h3 className="text-xl font-bold text-[var(--text-main)] mb-2">Password Change</h3>
                    <p className="text-sm text-[var(--text-muted)] mb-6 italic">Leave blank to keep the same password</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <label className={labelClasses}>Current Password</label>
                            <Input 
                                type="password"
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                placeholder="Current Password"
                                className={inputClasses}
                            />
                        </div>
                        <div>
                            <label className={labelClasses}>New Password</label>
                            <Input 
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                placeholder="New Password"
                                className={inputClasses}
                            />
                        </div>
                    </div>
                    
                    <div className="w-full md:w-1/2">
                        <label className={labelClasses}>Confirm New Password</label>
                        <Input 
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            placeholder="Confirm New Password"
                            className={inputClasses}
                        />
                    </div>
                </div>

                <div className="pt-4">
                    <Button1 type="submit" className="px-8 py-3 bg-[var(--primary-color)] hover:bg-[var(--primary-dark)]">
                        Save Changes
                    </Button1>
                </div>
            </form>
        </div>
    );
};

export default AccountDetails;
