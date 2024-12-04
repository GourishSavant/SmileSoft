// store,jsx 
// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import passwordResetReducer from './passwordResetSlice'; 
const store = configureStore({
  reducer: {
    auth: authReducer,
    passwordReset: passwordResetReducer,
  },
});

export default store;
