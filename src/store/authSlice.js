import axiosInstance from '@/api/axiosInstance';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;

      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;

      localStorage.removeItem('refreshToken');
    },
    // Update access token
    tokenRefresh: (state, action) => {
      state.accessToken = action.payload.accessToken;
    },
  },
});

export const { loginSuccess, logout, tokenRefresh } = authSlice.actions;
export default authSlice.reducer;
