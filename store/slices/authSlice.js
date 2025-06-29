import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '@/services/api';

// Async thunks
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/accounts/token/', { email, password });
      
      return {
        user: response.data,
        isProfileComplete: response.data?.is_profile_complete || false,
      };
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Login failed');
    }
  }
);

// Since refresh is being handled in backend itself no need to have thunk for refresh token here.

// export const refreshToken = createAsyncThunk(
//   'auth/refreshToken',
//   async (_, { getState, rejectWithValue }) => {
//     try {
//       const { refreshToken } = getState().auth;
//       if (!refreshToken) throw new Error('No refresh token available');
      
//       const response = await api.post('/api/token/refresh/', {
//         refresh: refreshToken,
//       });
      
//       const userResponse = await api.get('/api/user/me/');
      
//       return {
//         accessToken: response.data.access,
//         user: userResponse.data,
//         isProfileComplete: userResponse.data.is_profile_complete,
//       };
//     } catch (error) {
//       return rejectWithValue(error.response?.data || 'Token refresh failed');
//     }
//   }
// );

export const verifyAuth = createAsyncThunk(
  'auth/verifyAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authAPI.verifyToken();
      alert("called")
      return {
        user: response.data,
        isProfileComplete: response.data?.is_profile_complete || false,
      };
    } catch (error) {
      return rejectWithValue('Session expired');
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      await api.post('/accounts/logout/');
      return true;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Logout failed');
    }
  }
);

const initialState = {
  user: null,
  isAuthenticated: false,
  isProfileComplete: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    updateProfileCompleteness: (state, action) => {
      state.isProfileComplete = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isProfileComplete = action.payload.isProfileComplete;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(verifyAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isProfileComplete = action.payload.isProfileComplete;
      })
      .addCase(verifyAuth.rejected, (state) => {
        Object.assign(state, initialState);
      })
      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.fulfilled, (state) => {
        Object.assign(state, initialState);
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = authSlice.actions;
export default authSlice.reducer;