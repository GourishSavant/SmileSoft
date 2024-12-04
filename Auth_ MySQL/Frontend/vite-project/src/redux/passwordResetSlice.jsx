// src/slices/passwordResetSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  email: '',
  otp: '',
  newPassword: '',
  message: '',
  otpSent: false,
  isPasswordResetFormVisible: false,
};

const passwordResetSlice = createSlice({
  name: 'passwordReset',
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setOtp(state, action) {
      state.otp = action.payload;
    },
    setNewPassword(state, action) {
      state.newPassword = action.payload;
    },
    setMessage(state, action) {
      state.message = action.payload;
    },
    setOtpSent(state, action) {
      state.otpSent = action.payload;
    },
    setPasswordResetFormVisible(state, action) {
      state.isPasswordResetFormVisible = action.payload;
    },
    resetPasswordState(state) {
      // Reset the password reset state
      state.email = '';
      state.otp = '';
      state.newPassword = '';
      state.message = '';
      state.otpSent = false;
      state.isPasswordResetFormVisible = false;
    },
  },
});

export const {
  setEmail,
  setOtp,
  setNewPassword,
  setMessage,
  setOtpSent,
  setPasswordResetFormVisible,
  resetPasswordState,
} = passwordResetSlice.actions;

export default passwordResetSlice.reducer;
