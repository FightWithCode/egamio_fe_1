import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  refresh: null,
  user: null,
  uid: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.access;
      state.refresh = action.payload.refresh;
      state.username = action.payload.full_name;
      state.uid = action.payload.id;
    },
    logout: (state) => {
      state.token = null;
      state.refresh = null;
      state.username = null;
      state.uid = null;
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
