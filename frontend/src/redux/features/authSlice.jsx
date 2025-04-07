import { createSlice } from "@reduxjs/toolkit";

// Load persisted state from localStorage
const loadPersistedState = () => {
  try {
    const persistedData = localStorage.getItem('authData');
    if (persistedData) {
      const { user, token } = JSON.parse(persistedData);
      return {
        user,
        token,
        isAuthenticated: true,
        error: null,
      };
    }
  } catch (error) {
    console.error('Error loading auth state:', error);
  }
  return {
    user: null,
    token: null,
    isAuthenticated: false,
    error: null,
  };
};

const initialState = loadPersistedState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      // Clear localStorage on logout
      localStorage.removeItem('authData');
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
