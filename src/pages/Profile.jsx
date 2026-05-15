import React, { useEffect, useState } from 'react'
import PageHeader from '../components/ui/PageHeader'
import ProfileSidebar from '../components/profile/ProfileSidebar'
import ProfileDashboard from '../components/profile/ProfileDashboard'
import { Outlet, useLocation } from 'react-router-dom'
import RecentOrders from '../components/profile/RecentOrders'
import AccountDetails from '../components/profile/AccountDetails'
import AffiliateLink from '../components/profile/AffiliateLink'
import AffiliateTransactions from '../components/profile/AffiliateTransactions'
import Payouts from '../components/profile/Payouts'
import { getUserProfile } from '../api/User-api'
import { useDispatch } from 'react-redux'
import { setUser } from '../redux/slices/authSlice'
import toast from 'react-hot-toast'

const Profile = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const isBaseProfile = location.pathname === '/profile' || location.pathname === '/profile/';

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const response = await getUserProfile();
        if (response.success) {
          dispatch(setUser(response.data));
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error("Failed to load profile details");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [dispatch]);

  if (loading) {
    return (
        <div className="bg-gray-50 min-h-screen pb-20 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[var(--primary-color)]"></div>
        </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
        <PageHeader title="Profile"/>
        
        <div className=" mx-auto px-4">
            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <div className="w-full lg:w-1/4">
                    <ProfileSidebar />
                </div>

                {/* Content Area */}
                <div className="w-full lg:w-2/3 xl:w-3/4">
                    <div className="">
                        <Outlet />
                       
                        {isBaseProfile && ( 
                            <div className="flex flex-col gap-8">
                                <ProfileDashboard />
                                <RecentOrders/>
                                <AccountDetails/>
                                <AffiliateLink/>
                                <AffiliateTransactions/>
                                <Payouts/>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile
