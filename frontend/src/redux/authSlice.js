import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null,
  token: localStorage.getItem('token') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.refreshToken = action.payload.refreshToken;
      
      localStorage.setItem('user', JSON.stringify(action.payload.user));
      localStorage.setItem('token', action.payload.token);
      if (action.payload.refreshToken) {
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      }
    },
    refreshToken: (state, action) => {
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
      
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    },
  },
});

export const { login, logout, refreshToken } = authSlice.actions;

export const refreshTokenThunk = () => async (dispatch, getState) => {
  try {
    const { token } = getState().auth;
    if (!token) return;
    
    const response = await axios.post('http://localhost:5000/auth/refresh-token', { token });
    
    if (response.data.success) {
      // Update token in the state and localStorage
      localStorage.setItem('token', response.data.token);
      dispatch(refreshToken({ token: response.data.token }));
    }
  } catch (error) {
    console.error('Failed to refresh token:', error);
    // If refresh fails, force logout
    dispatch(logout());
  }
};

// Setup axios interceptor for automatic token refresh
export const setupTokenRefresh = () => (dispatch, getState) => {
  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      
      // If error is 403 and specifically about token expiration
      if (error.response?.status === 403 && 
          error.response?.data?.message === "Token has expired" &&
          !originalRequest._retry) {
        
        originalRequest._retry = true;
        
        try {
          // Refresh the token
          await dispatch(refreshTokenThunk());
          
          // Get the fresh token
          const { token } = getState().auth;
          
          // Update authorization header
          originalRequest.headers['Authorization'] = `Bearer ${token}`;
          
          // Retry the original request
          return axios(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      
      return Promise.reject(error);
    }
  );
};

export default authSlice.reducer;
