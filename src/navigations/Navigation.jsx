import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Product from '../pages/Product';
import ViewProduct from '../pages/ViewProduct';
import TopCollection from '../pages/TopCollection';
import Login from '../auth/Login';
import Register from '../auth/Register';
import VerifyOtp from '../auth/VerifyOtp';
import paths from '../path/path';
import CartDetails from '../pages/CartDetails';
import Checkout from '../pages/Checkout';
import Profile from '../pages/Profile';
import AccountDetails from '../components/profile/AccountDetails';
import OrderHistory from '../components/profile/OrderHistory';
import ManageAddresses from '../components/profile/ManageAddresses';
import Wishlist from '../components/profile/Wishlist';
import SupportTickets from '../components/profile/SupportTickets';
import OrderDetails from '../components/profile/OrderDetails';

import GuestRoute from './GuestRoute';

const Navigation = () => {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path={paths.home} element={<Home />} />
                <Route path={paths.snacks} element={<Product />} />
                <Route path={paths.groceries} element={<Product />} />
                <Route path={paths.fruits} element={<Product />} />
                <Route path={paths.beverages} element={<Product />} />
                <Route path={paths.products} element={<Product />} />
                <Route path={paths.viewProduct} element={<ViewProduct />} />
                <Route path={paths.collections} element={<TopCollection />} />
                <Route path={paths.category} element={<Product />} />
                
                {/* Guest Routes */}
                <Route element={<GuestRoute />}>
                    <Route path={paths.login} element={<Login />} />
                    <Route path={paths.signup} element={<Register />} />
                    <Route path={paths.verifyOtp} element={<VerifyOtp />} />
                </Route>

                <Route path={paths.cart} element={<CartDetails />} />
                <Route path={paths.checkout} element={<Checkout />} />
                <Route path={paths.profile} element={<Profile />}>
                    <Route path="details" element={<AccountDetails />} />
                    <Route path="orders" element={<OrderHistory />} />
                    <Route path="orders/:id" element={<OrderDetails />} />
                    <Route path="addresses" element={<ManageAddresses />} />
                    <Route path="wishlist" element={<Wishlist />} />
                    <Route path="tickets" element={<SupportTickets />} />
                </Route>
            </Route>
        </Routes>
    );
};

export default Navigation;
