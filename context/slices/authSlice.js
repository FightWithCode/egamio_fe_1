import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: () => {
    const userData = localStorage.getItem('eu_data');
    return {
      user: userData ? JSON.parse(userData) : null,
      isAuthenticated: !!userData,
    };

  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      localStorage.setItem('eu_data', JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('eu_data');
    },
    checkAuthStatus: (state) => {
      const userData = localStorage.getItem('eu_data');
      if (userData) {
        state.user = JSON.parse(userData);
        state.isAuthenticated = true;
      } else {
        state.user = null;
        state.isAuthenticated = false;
      }
    },
  },
});

export const { login, logout, checkAuthStatus } = authSlice.actions;
export default authSlice.reducer;