import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

// Check for existing token
const getInitialToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('quizard_token') || sessionStorage.getItem('quizard_token') || null;
  }
  return null;
};

// Async Thunks
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ credentials, rememberMe }, { rejectWithValue }) => {
    try {
      const data = await api.auth.login(credentials);
      const token = data.token;
      
      // Store token based on Remember Me preference
      if (rememberMe) {
        localStorage.setItem('quizard_token', token);
      } else {
        sessionStorage.setItem('quizard_token', token);
      }
      
      return data; // contains token and user profile
    } catch (error) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const data = await api.auth.register(userData);
      localStorage.setItem('quizard_token', data.token); // default save to local storage
      return data;
    } catch (error) {
      return rejectWithValue(error.message || 'Registration failed');
    }
  }
);

export const loadCurrentUser = createAsyncThunk(
  'auth/loadUser',
  async (_, { rejectWithValue }) => {
    try {
      const data = await api.auth.getCurrentUser();
      return data.user;
    } catch (error) {
      // Clear token since it is invalid
      localStorage.removeItem('quizard_token');
      sessionStorage.removeItem('quizard_token');
      return rejectWithValue('Session expired');
    }
  }
);

export const updateProfile = createAsyncThunk(
  'auth/updateProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const data = await api.profile.update(profileData);
      return data.user;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update profile');
    }
  }
);

export const changeAvatar = createAsyncThunk(
  'auth/changeAvatar',
  async (avatarName, { rejectWithValue }) => {
    try {
      const data = await api.profile.uploadAvatar(avatarName);
      return data.user;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to update avatar');
    }
  }
);

const initialState = {
  user: null,
  token: getInitialToken(),
  isAuthenticated: !!getInitialToken(),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('quizard_token');
      sessionStorage.removeItem('quizard_token');
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Load user
      .addCase(loadCurrentUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loadCurrentUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loadCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.token = null;
        state.user = null;
        state.error = action.payload;
      })
      // Update profile
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Change avatar
      .addCase(changeAvatar.fulfilled, (state, action) => {
        state.user = action.payload;
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;
