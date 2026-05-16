import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { startLoading, stopLoading } from '../redux/slices/loadingSlice';
import authStorage from '../utils/authStorage';
import Button1 from '../components/ui/Button1';
import paths from '../path/path';

const Login = () => {
  const [formData, setFormData] = useState({
    userIdOrEmail: '',
    password: '',
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginStart());
    dispatch(startLoading());

    // Simulating API call delay
    setTimeout(() => {
      const mockToken = 'mock-jwt-token';
      const mockUser = {
        id: '1',
        name: 'Mock User',
        email: formData.userIdOrEmail,
        username: formData.userIdOrEmail
      };

      authStorage.setToken(mockToken);
      dispatch(loginSuccess({ user: mockUser, token: mockToken }));
      dispatch(stopLoading());
      navigate(paths.home);
    }, 1000);
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

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
              User ID / Email
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiUser className="text-gray-400 group-focus-within:text-[var(--primary-color)] transition-colors text-xl" />
              </div>
              <input
                type="text"
                name="userIdOrEmail"
                required
                value={formData.userIdOrEmail}
                onChange={handleChange}
                placeholder="SSI-XXXX"
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:bg-white focus:border-transparent transition-all placeholder:text-gray-400 font-medium"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs font-bold text-[var(--primary-color)] hover:underline"
              >
                Forgot?
              </Link>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiLock className="text-gray-400 group-focus-within:text-[var(--primary-color)] transition-colors text-xl" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-4 bg-gray-50 border border-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:bg-white focus:border-transparent transition-all placeholder:text-gray-400 font-medium"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <FiEyeOff className="text-xl" /> : <FiEye className="text-xl" />}
              </button>
            </div>
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