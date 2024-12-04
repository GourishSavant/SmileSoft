
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setEmail, setOtp, setNewPassword, setMessage, setOtpSent, setPasswordResetFormVisible } from '../redux/passwordResetSlice.jsx';
import axiosApi from '../utils/axiosApi.js';

function RequestResetPassword() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Access Redux state
  const { email, otp, newPassword, message, otpSent, isPasswordResetFormVisible } = useSelector(state => state.passwordReset);

  // Handle email submission to request OTP
  const handleSubmit = (e) => {
    e.preventDefault();

    axiosApi.post('/auth/v1/request-otp', { email })
      .then((response) => {
        if (response.data.success) {
          dispatch(setMessage('OTP has been sent to your email!'));
          dispatch(setOtpSent(true));
        } else {
          dispatch(setMessage('Error sending OTP. Please try again.'));
        }
      })
      .catch(() => {
        dispatch(setMessage('Error sending OTP. Please try again.'));
      });
  };

  // Handle OTP verification and password reset
  const handleOtpVerification = (e) => {
    e.preventDefault();

    axiosApi.post('/auth/v1/verify-otp', { email, otp })
      .then((response) => {
        if (response.data.success) {
          dispatch(setMessage('OTP verified successfully! Please enter a new password.'));
          dispatch(setPasswordResetFormVisible(true));
        } else {
          dispatch(setMessage('Invalid OTP. Please try again.'));
        }
      })
      .catch(() => {
        dispatch(setMessage('Error verifying OTP. Please try again.'));
      });
  };

  // Handle password reset
  const handlePasswordReset = (e) => {
    e.preventDefault();

    axiosApi.post('/auth/v1/reset-password', { email, newPassword })
      .then((response) => {
        if (response.data.success) {
          dispatch(setMessage('Password reset successfully!'));
          setTimeout(() => navigate('/auth/login'), 2000);
        } else {
          dispatch(setMessage('Error resetting password. Please try again.'));
        }
      })
      .catch(() => {
        dispatch(setMessage('Error resetting password. Please try again.'));
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Forgot Password</h2>

        {/* Request OTP Form */}
        {!otpSent && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => dispatch(setEmail(e.target.value))}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Send OTP
            </button>
          </form>
        )}

        {/* OTP Verification Form */}
        {otpSent && !isPasswordResetFormVisible && (
          <form onSubmit={handleOtpVerification} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => dispatch(setOtp(e.target.value))}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Verify OTP
            </button>
          </form>
        )}

        {/* Reset Password Form */}
        {otpSent && isPasswordResetFormVisible && (
          <form onSubmit={handlePasswordReset} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => dispatch(setNewPassword(e.target.value))}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Reset Password
            </button>
          </form>
        )}

        <p className="text-center text-sm mt-4 text-gray-600">{message}</p>
      </div>
    </div>
  );
}

export default RequestResetPassword;

















