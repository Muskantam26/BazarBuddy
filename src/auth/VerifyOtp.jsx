import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiMail, FiCheckCircle } from 'react-icons/fi';
import { startLoading, stopLoading } from '../redux/slices/loadingSlice';
import Button1 from '../components/ui/Button1';
import paths from '../path/path';
import toast from 'react-hot-toast';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loading);

  const email = location.state?.email;

  useEffect(() => {
    if (!email) {
      toast.error('Session expired. Please register again.');
      navigate(paths.signup);
    }
  }, [email, navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!otp || otp.length < 4) {
      toast.error('Please enter a valid OTP');
      return;
    }

    dispatch(startLoading());
    // Mock verification
    setTimeout(() => {
        dispatch(stopLoading());
        toast.success('Email verified successfully! (Mock)');
        navigate(paths.login);
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 bg-[var(--bg-gray-soft)]">
      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-100 shadow-xl p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 text-[var(--primary-color)]">
            <FiMail className="text-4xl" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Verify Email</h1>
          <p className="text-gray-500 text-sm leading-relaxed">
            We've sent a verification code to <br />
            <span className="font-semibold text-gray-700">{email}</span>
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-8">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest text-center mb-4">
              Enter 6-Digit Code
            </label>
            <input
              type="text"
              maxLength={6}
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
              placeholder="0 0 0 0 0 0"
              className="w-full text-center text-3xl font-bold tracking-[0.5em] py-5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] focus:bg-white focus:border-transparent transition-all placeholder:text-gray-200"
            />
          </div>

          <Button1
            type="submit"
            className="w-full py-5 text-lg shadow-lg shadow-emerald-100"
            disabled={isLoading}
          >
            {isLoading ? 'Verifying...' : (
              <span className="flex items-center justify-center gap-2">
                <FiCheckCircle className="text-xl" />
                Verify OTP
              </span>
            )}
          </Button1>
        </form>

        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500">
            Didn't receive the code?{' '}
            <button 
              type="button" 
              className="font-bold text-[var(--primary-color)] hover:underline"
              onClick={() => toast.success('Please wait a moment before requesting a new code')}
            >
              Resend Code
            </button>
          </p>
          <button 
            onClick={() => navigate(paths.signup)}
            className="mt-6 text-xs text-gray-400 hover:text-gray-600 transition-colors uppercase font-bold tracking-widest"
          >
            ← Back to Registration
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
