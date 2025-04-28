import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '@/services/api';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
};

const restoreAuthState = () => {
  if (typeof window !== 'undefined') { // Check if running in the browser
    const user = JSON.parse(localStorage.getItem('eu_data'));
    return user ? { user, isAuthenticated: true, loading: false, error: null } : initialState;
  }
  return initialState; // Return default state during SSR
};

// Thunks
export const checkAuthStatus = createAsyncThunk('auth/checkAuthStatus', async (_, thunkAPI) => {
  try {
    const res = await authAPI.verifyToken();
    const user = JSON.parse(localStorage.getItem('eu_data'));
    return user;
  } catch (err) {
    return thunkAPI.rejectWithValue('Unauthorized');
  }
});

export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
  try {
    const res = await authAPI.login({ email, password });
    const { id, full_name, is_profile_complete } = res.data;

    const user = {
      id,
      fullName: full_name,
      isProfileComplete: is_profile_complete,
    };
    localStorage.setItem('eu_data', JSON.stringify(user));
    return user;
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data?.detail || 'Login failed');
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  try {
    await authAPI.logout();
    localStorage.removeItem('eu_data');
  } catch (err) {
    return thunkAPI.rejectWithValue('Logout failed');
  }
});

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState: restoreAuthState(), // Initialize state from localStorage
  reducers: {
    updateProfileCompleteness(state, action) {
      if (state.user) {
        state.user.isProfileComplete = action.payload;
      }
    },
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuthStatus.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
        localStorage.setItem('eu_data', JSON.stringify(action.payload)); // Persist user data
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuthenticated = false;
        state.loading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.loading = false;
        localStorage.removeItem('eu_data'); // Clear user data
      });
  },
});

export const { updateProfileCompleteness, setUser } = authSlice.actions;
export default authSlice.reducer;
