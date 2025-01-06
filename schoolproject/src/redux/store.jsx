import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import admissionReducer from './slices/admissionSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    admission: admissionReducer,
  },
});

export default store;
