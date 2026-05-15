import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { 
    FaBox, 
    FaLocationDot, 
    FaHeart, 
    FaUser 
} from 'react-icons/fa6';
import { logout } from '../../redux/slices/authSlice';
import toast from 'react-hot-toast';
import paths from '../../path/path';
// import RecentOrders from './RecentOrders';

const ProfileDashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        dispatch(logout());
        toast.success('Logged out successfully');
        navigate(paths.login);
    };

    const dashboardCards = [
        {
            title: 'Orders',
            description: 'View and track your orders',
            linkText: 'View Orders',
            path: paths.orders || '/profile/orders',
            icon: <FaBox />
        },
        {
            title: 'Addresses',
            description: 'Manage your addresses',
            linkText: 'Manage Addresses',
            path: paths.addresses || '/profile/addresses',
            icon: <FaLocationDot />
        },
        {
            title: 'Wishlist',
            description: 'View saved items',
            linkText: 'View Wishlist',
            path: paths.wishlist || '/profile/wishlist',
            icon: <FaHeart />
        },
        {
            title: 'Account Details',
            description: 'View and track your details',
            linkText: 'Edit Details',
            path: paths.details || '/profile/details',
            icon: <FaUser />
        }
    ];

    return (
        <div className="space-y-10 bg-[var(--bg-gray-soft)] rounded-2xl shadow-sm border border-[var(--border-color)] p-8 ">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold text-[var(--text-main)]">Dashboard</h2>
                
                <p className="text-[var(--text-color)]">
                    Hello <span className="font-bold text-[var(--text-color)]">{user?.userInformation?.name || 'User'}</span> 
                    ( not <span className="font-bold text-[var(--text-color)]">{user?.userInformation?.name || 'User'}</span>? 
                    <button 
                        onClick={handleLogout}
                        className="ml-1 text-[var(--primary-color)] hover:underline font-medium cursor-pointer"
                    >
                        Log out
                    </button> )
                </p>

                <p className="text-[var(--text-color)] leading-relaxed">
                    From your account dashboard you can view your 
                    <span className="text-[var(--primary-color)] font-medium mx-1 cursor-pointer hover:underline" onClick={() => navigate(paths.orders)}>recent orders</span>, 
                    manage your 
                    <span className="text-[var(--primary-color)] font-medium mx-1 cursor-pointer hover:underline" onClick={() => navigate(paths.addresses)}>shipping and billing addresses</span>, 
                    and 
                    <span className="text-[var(--primary-color)] font-medium mx-1 cursor-pointer hover:underline" onClick={() => navigate(paths.details)}>edit your password and account details</span>
                </p>
            </div>

            {/* Navigation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {dashboardCards.map((card) => (
                    <div 
                        key={card.title}
                        className="bg-[var(--bg-gray-soft)] border border-[var(--border-color)] rounded-xl p-6 flex flex-col items-center text-center hover:shadow-md transition-shadow duration-300"
                    >
                        <div className="w-12 h-12 bg-[var(--primary-color)] rounded-full flex items-center justify-center text-[var(--white)] text-xl mb-4">
                            {card.icon}
                        </div>
                        <h3 className="text-lg font-bold text-[var(--text-main)] mb-1">{card.title}</h3>
                        <p className="text-sm text-[var(--text-color)] mb-4">{card.description}</p>
                        <button 
                            onClick={() => navigate(card.path)}
                            className="text-[var(--primary-color)] font-medium hover:underline text-sm"
                        >
                            {card.linkText}
                        </button>
                    </div>
                ))}
            </div>

            {/* Recent Orders Section */}
           
        </div>
    );
};

export default ProfileDashboard;
