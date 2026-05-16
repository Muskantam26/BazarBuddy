import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure, registerSuccess } from '../redux/slices/authSlice';
import { startLoading, stopLoading } from '../redux/slices/loadingSlice';
import authStorage from '../utils/authStorage';
import Button1 from '../components/ui/Button1';
import paths from '../path/path';
import toast from 'react-hot-toast';


const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    username: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
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



  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      dispatch(loginFailure('Passwords do not match'));
      return;
    }

    dispatch(loginStart());
    dispatch(startLoading());

    
    setTimeout(() => {
      const mockUser = {
        name: formData.fullName,
        email: formData.email,
        username: formData.username
      };
      
      dispatch(registerSuccess(mockUser));
      dispatch(stopLoading());
      toast.success('Registration successful! Welcome to Greentic.');
      navigate(paths.home);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-[var(--bg-gray-soft)]">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Create Your Account</h1>
        <p className="text-gray-600">Join FreshMart for a seamless shopping experience</p>
      </div>

      <div className="w-full max-w-2xl bg-white rounded-xl border border-gray-100 shadow-sm p-8 md:p-12">
        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
              {error}
            </div>
          )}

        
          {/* Personal Information */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all placeholder:text-gray-300"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="johndoe123"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all placeholder:text-gray-300"
                />
              </div>
            </div>
          </section>

          {/* Account Information */}
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-6">Account Information</h2>
            <div className="space-y-6">
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
                  placeholder="Shop@Company.Com"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all placeholder:text-gray-300"
                />
                <p className="mt-1.5 text-xs text-gray-500">We'll send an OTP to verify your email after registration</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="mobile"
                  required
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="1234567890"
                  className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all placeholder:text-gray-300"
                />
                <p className="mt-1.5 text-xs text-gray-500">For order updates and delivery notifications</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="**********"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all placeholder:text-gray-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                    Confirm Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="**********"
                    className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all placeholder:text-gray-300"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                Password must be at least 8 characters long and include a mix of letters, numbers, and special characters
              </p>
            </div>
          </section>

          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-start">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                required
                checked={formData.agreeTerms}
                onChange={handleChange}
                className="mt-1 w-4 h-4 text-[var(--primary-color)] border-gray-300 rounded focus:ring-[var(--primary-color)]"
              />
              <label htmlFor="agreeTerms" className="ml-2 block text-sm text-gray-700 leading-relaxed">
                I agree to the Terms & Conditions and Privacy Policy. I confirm that I am at least 18 years old.
              </label>
            </div>
          </div>

          <Button1
            type="submit"
            className="w-full py-4 text-lg"
            disabled={isLoading}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button1>
        </form>
      </div>

      <p className="mt-8 text-center text-sm text-gray-600">
        Already have an account?{' '}
        <Link to={paths.login} className="font-semibold text-[var(--primary-color)] hover:underline">
          Sign In here
        </Link>
      </p>
    </div>
  );
};

export default Register;