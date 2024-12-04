// userSlice.jsx
// src/slices/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  accessToken: localStorage.getItem('accesstoken') || '',
  role: localStorage.getItem('role') || '',
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.role = action.payload.role;
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.accessToken = '';
      state.role = '';
      state.user = null;
      localStorage.removeItem('accesstoken');
      localStorage.removeItem('role');
    },
  },
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;
