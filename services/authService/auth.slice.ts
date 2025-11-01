import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from './types';
import { authApi } from './auth.api';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
      state.isLoading = false;
    },

    resetAuth: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      .addMatcher(authApi.endpoints.getMe.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.getMe.matchFulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.getMe.matchRejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch user';
      })
      .addMatcher(authApi.endpoints.checkAuth.matchPending, (state) => {
        state.isLoading = true;
      })
      .addMatcher(authApi.endpoints.checkAuth.matchFulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.checkAuth.matchRejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
      })
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.logout.matchRejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const {
  setUser,
  setLoading,
  setError,
  clearError,
  logout,
  resetAuth,
} = authSlice.actions;

export default authSlice.reducer;