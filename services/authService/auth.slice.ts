// src/services/authService/auth.slice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User, CreditStats } from './types';
import { authApi } from './auth.api';

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  credits: null,
  creditType: null,
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
    setCredits: (state, action: PayloadAction<{ credits: CreditStats; type: 'user' | 'session' }>) => {
      state.credits = action.payload.credits;
      state.creditType = action.payload.type;
    },
    updateCredits: (state, action: PayloadAction<Partial<CreditStats>>) => {
      if (state.credits) {
        state.credits = { ...state.credits, ...action.payload };
      }
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
      state.credits = null;
      state.creditType = null;
      state.error = null;
      state.isLoading = false;
    },
    resetAuth: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Handle getMe (for logged-in users)
      .addMatcher(authApi.endpoints.getMe.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.getMe.matchFulfilled, (state, action) => {
        if (action.payload.user) {
          state.user = action.payload.user;
          state.isAuthenticated = true;
        }
        state.credits = action.payload.credits;
        state.creditType = action.payload.type;
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.getMe.matchRejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = action.error.message || 'Failed to fetch user';
      })
      // Handle getGuestCredits (for guests)
      .addMatcher(authApi.endpoints.getGuestCredits.matchFulfilled, (state, action) => {
        state.credits = action.payload.credits;
        state.creditType = action.payload.type;
      })
      // Handle logout
      .addMatcher(authApi.endpoints.logout.matchFulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.credits = null;
        state.creditType = null;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.logout.matchRejected, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.credits = null;
        state.creditType = null;
      });
  },
});

export const {
  setUser,
  setCredits,
  updateCredits,
  setLoading,
  setError,
  clearError,
  logout,
  resetAuth,
} = authSlice.actions;

export default authSlice.reducer;