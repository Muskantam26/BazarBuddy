import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginStart, loginSuccess, loginFailure } from '../redux/slices/authSlice';
import { startLoading, stopLoading } from '../redux/slices/loadingSlice';
import authStorage from '../utils/authStorage';
import Button1 from '../components/ui/Button1';
import paths from '../path/path';
import { registerUser } from '../api/User-api';
import toast from 'react-hot-toast';


const Register = () => {
  const [formData, setFormData] = useState({
    sponsorId: '',
    placementPosition: '', // 'left' or 'right'
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



  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      dispatch(loginFailure('Passwords do not match'));
      return;
    }

    dispatch(loginStart());
    dispatch(startLoading());

    try {
      const res = await registerUser({
        name: formData.fullName,
        email: formData.email,
        phone: formData.mobile,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        position: formData.placementPosition,
        sponsorId: formData.sponsorId
      });

      if (res.success) {
        toast.success(res.message || 'Registration successful! OTP sent to your email.');
        navigate(paths.verifyOtp, { state: { email: formData.email } });
      } else {
        dispatch(loginFailure(res.message || 'Registration failed'));
      }
    } catch (err) {
      dispatch(loginFailure(err?.response?.data?.message || err.message || 'Registration failed'));
    } finally {
      dispatch(stopLoading());
    }
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

          {/* Sponsor Information */}
          <section className="p-6 bg-gray-50/50 rounded-xl border border-gray-100">
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold text-red-500 uppercase tracking-wider mb-2">
                  Sponsor / Referral ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="sponsorId"
                  required
                  value={formData.sponsorId}
                  onChange={handleChange}
                  placeholder="e.g. COL-8392"
                  className="w-full px-5 py-4 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:border-transparent transition-all placeholder:text-gray-300 text-lg font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                  Placement Position <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, placementPosition: 'left' }))}
                    className={`py-4 px-6 rounded-xl border-2 font-bold uppercase tracking-wide transition-all ${
                      formData.placementPosition === 'left'
                        ? 'border-[var(--primary-color)] bg-[var(--primary-color)] text-white shadow-lg shadow-emerald-100'
                        : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'
                    }`}
                  >
                    Left Leg
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, placementPosition: 'right' }))}
                    className={`py-4 px-6 rounded-xl border-2 font-bold uppercase tracking-wide transition-all ${
                      formData.placementPosition === 'right'
                        ? 'border-[var(--primary-color)] bg-[var(--primary-color)] text-white shadow-lg shadow-emerald-100'
                        : 'border-gray-100 bg-white text-gray-400 hover:border-gray-200'
                    }`}
                  >
                    Right Leg
                  </button>
                </div>
                {/* Hidden input for form validation if needed */}
                <input type="hidden" name="placementPosition" value={formData.placementPosition} required />
              </div>
            </div>
          </section>

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