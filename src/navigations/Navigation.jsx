import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import Home from '../pages/Home';
import Product from '../pages/Product';
import ViewProduct from '../pages/ViewProduct';
import TopCollection from '../pages/TopCollection';
import Login from '../auth/Login';
import Register from '../auth/Register';
import paths from '../path/path';

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
                <Route path={paths.login} element={<Login />} />
                <Route path={paths.signup} element={<Register />} />
            </Route>
        </Routes>
    );
};

export default Navigation;
