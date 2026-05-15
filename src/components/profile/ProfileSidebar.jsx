import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
    FaBox, 
    FaLocationDot, 
    FaHeart, 
    FaUser, 
    FaTicket, 
    FaArrowRightFromBracket, 
    FaUsers, 
    FaChartLine, 
    FaMoneyBill 
} from 'react-icons/fa6';
import { logout } from '../../redux/slices/authSlice';
import toast from 'react-hot-toast';

const ProfileSidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useSelector((state) => state.auth);

    const menuItems = [
        { name: 'Orders', icon: <FaBox />, path: '/profile/orders' },
        { name: 'Addresses', icon: <FaLocationDot />, path: '/profile/addresses' },
        { name: 'Wishlist', icon: <FaHeart />, path: '/profile/wishlist' },
        { name: 'Account Details', icon: <FaUser />, path: '/profile/details' },
        { name: 'Support Ticket', icon: <FaTicket />, path: '/profile/tickets' },
        { name: 'Logout', icon: <FaArrowRightFromBracket />, type: 'logout' },
        { name: 'Affiliate Link', icon: <FaUsers />, path: '/profile/affiliate-link' },
        { name: 'Affiliate Transactions', icon: <FaChartLine />, path: '/profile/affiliate-transactions' },
        { name: 'Payouts', icon: <FaMoneyBill />, path: '/profile/payouts' },
    ];

    const handleLogout = () => {
        dispatch(logout());
        toast.success('Logged out successfully');
        navigate('/login');
    };

    return (
        <div className="bg-[var(--bg-gray-soft)] rounded-2xl shadow-sm border border-[var(--border-color)] overflow-hidden w-full">
            {/* User Profile Header */}
            <div className="p-4 border-b border-[var(--border-color)] flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[var(--primary-color)] overflow-hidden flex items-center justify-center text-white text-2xl font-bold">
                    {user?.userInformation?.profilePic ? (
                        <img src={user.userInformation.profilePic} alt="profile" className="w-full h-full object-cover" />
                    ) : (
                        user?.userInformation?.name ? user.userInformation.name.charAt(0).toUpperCase() : <FaUser className="text-xl" />
                    )}
                </div>
                <div>
                    <h3 className="text-lg font-bold text-gray-800">{user?.userInformation?.name || 'User Name'}</h3>
                    <p className="text-sm text-gray-500">{user?.userInformation?.email || 'user@example.com'}</p>
                </div>
            </div>

            {/* Navigation Menu */}
            <div className="">
                {menuItems.map((item) => {
                    const isActive = location.pathname === item.path;
                    
                    if (item.type === 'logout') {
                        return (
                            <div
                                key={item.name}
                                onClick={handleLogout}
                                className="w-full flex items-center gap-4 px-6 py-3.5 text-[var(--red-color)] hover:bg-[var(--red-color)] hover:text-white transition-all duration-200 group cursor-pointer"
                            >
                                <span className="text-lg group-hover:scale-110 transition-transform">
                                    {item.icon}
                                </span>
                                <span className="font-medium">{item.name}</span>
                            </div>
                        );
                    }

                    return (
                        <div
                            key={item.name}
                            onClick={() => navigate(item.path)}
                            className={`flex items-center gap-4 px-7 py-2.5 transition-all duration-200 group cursor-pointer ${
                                isActive
                                    ? 'bg-[var(--primary-light)] text-[var(--primary-color)] border-r-4 border-[var(--primary-color)]'
                                    : 'text-[var(--text-color)] hover:bg-[var(--primary-light)]'
                            }`}
                        >
                            <span className={`text-lg group-hover:scale-110 transition-transform ${
                                isActive ? 'text-[var(--primary-color)]' : 'text-[var(--text-color)]'
                            }`}>
                                {item.icon}
                            </span>
                            <span className="font-medium">{item.name}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default ProfileSidebar;
