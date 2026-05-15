import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import paths from '../path/path';

const GuestRoute = () => {
    const { isAuthenticated } = useSelector((state) => state.auth);

    if (isAuthenticated) {
        return <Navigate to={paths.home} replace />;
    }

    return <Outlet />;
};

export default GuestRoute;
