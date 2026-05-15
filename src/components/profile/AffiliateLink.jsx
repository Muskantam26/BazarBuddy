import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Input from '../ui/Input';
import Button1 from '../ui/Button1';
import toast from 'react-hot-toast';

const AffiliateLink = () => {
    const { user } = useSelector((state) => state.auth);
    
    // Constructing a dynamic affiliate link
    const affiliateUrl = `${window.location.origin}/signup?ref=${user?._id || 'guest'}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(affiliateUrl);
        toast.success('Affiliate link copied to clipboard!');
    };

    return (
        <div className="bg-[var(--bg-gray-soft)] rounded-2xl border border-[var(--border-color)] p-8">
            <h2 className="text-2xl font-bold text-[var(--text-main)] mb-8">Affiliate Link</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
                {/* Earn Commission Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-[var(--text-main)]">Earn Commission</h3>
                    <div className="h-[1px] bg-[var(--border-color)] w-full"></div>
                    <p className="text-[var(--text-muted)] text-sm">
                        Refer <span className="font-semibold">greentic</span> and earn <span className="text-[var(--primary-color)] font-bold">$100</span> per paid signup!
                    </p>
                </div>

                {/* Affiliate Link Section */}
                <div className="space-y-4">
                    <h3 className="text-lg font-bold text-[var(--text-main)]">Your Affiliate Link</h3>
                    <div className="flex items-center">
                        <Input 
                            value={affiliateUrl}
                            readOnly
                            className="flex-1 px-4 py-3 border border-[var(--border-color)] rounded-l-xl bg-white text-[var(--text-color)] text-sm"
                        />
                        <Button1 
                            onClick={handleCopy}
                            className="rounded-l-none rounded-r-xl px-8 h-full bg-[var(--primary-color)] hover:bg-[var(--primary-dark)]"
                        >
                            Copy
                        </Button1>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AffiliateLink;
