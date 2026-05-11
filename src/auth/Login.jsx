import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { startLoading, stopLoading } from '../redux/slices/loadingSlice';
import authStorage from '../utils/authStorage';
import Button1 from '../components/ui/Button1';
import paths from '../path/path';

import { loginUser } from '../api/User-api';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.loading);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    dispatch(startLoading());

    try {
      const res = await loginUser({
        email: formData.email,
        password: formData.password
      });

      if (res.success) {
        authStorage.setToken(res.token);
        dispatch(loginSuccess({ user: res.user, token: res.token }));
        navigate(paths.home);
      } else {
        dispatch(loginFailure(res.message || 'Invalid email or password'));
      }
    } catch (err) {
      dispatch(loginFailure(err?.response?.data?.message || err.message || 'Invalid email or password'));
    } finally {
      dispatch(stopLoading());
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Sign In</h1>
        <p className="text-gray-600">Welcome back! Sign in to your account to continue.</p>
      </div>

      <div className="w-full max-w-md bg-white rounded-xl border border-gray-100 shadow-sm p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="Greentic@Example.Com"
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all placeholder:text-gray-400"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="block text-sm font-semibold text-gray-700">
                Password <span className="text-red-500">*</span>
              </label>
              <Link
                to="/forgot-password"
                className="text-xs font-medium text-[var(--primary-color)] hover:underline opacity-80"
              >
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              name="password"
              required
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••••••••••••••"
              className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="rememberMe"
              name="rememberMe"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="w-4 h-4 text-[var(--primary-color)] border-gray-300 rounded focus:ring-[var(--primary-color)]"
            />
            <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <Button1
            type="submit"
            className="w-full py-3"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </Button1>
        </form>
      </div>

      <p className="mt-8 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to={paths.signup} className="font-semibold text-[var(--primary-color)] hover:underline">
          Sign up here
        </Link>
      </p>
    </div>
  );
};

export default Login;