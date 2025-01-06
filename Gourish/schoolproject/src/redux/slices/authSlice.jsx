import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../api/axios';

// Async thunk for login request
export const loginUser = createAsyncThunk('auth/loginUser', async (credentials, thunkAPI) => {
  try {
    const response = await axiosApi.post('/auth/login', credentials); // Login request
    const { accesstoken, user } = response.data;

    // Store token in local storage
    localStorage.setItem('accesstoken', accesstoken);

    return { accesstoken, user }; // Return response data
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data); // Handle error response
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: localStorage.getItem('accesstoken') || '',
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.accessToken = '';
      state.user = null;
      localStorage.removeItem('accesstoken');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.accesstoken;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Login failed';
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
