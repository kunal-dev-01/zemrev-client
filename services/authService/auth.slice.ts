// src/services/authService/auth.slice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, User } from './types';
import { authApi } from './auth.api';

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Extract error message
const extractErrorMessage = (error: unknown): string => {
  if (!error) return 'An unexpected error occurred';
  if (typeof error === 'string') return error;

  if (typeof error === 'object') {
    const err = error as Record<string, any>;
    if ('data' in err && err.data) {
      const { message, error: errorMsg } = err.data;
      return message || errorMsg || 'Request failed';
    }
    const { message, error: errorMsg } = err;
    return message || errorMsg || 'An unexpected error occurred';
  }

  return 'An unexpected error occurred';
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Manual user update
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.error = null;
    },

    // Manual token update (used by refresh token flow)
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      state.isAuthenticated = true;
    },

    // Set both user and token together
    setCredentials: (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.isAuthenticated = true;
      state.error = null;
    },

    // Manual loading state control
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Manual error setting
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    // Clear error
    clearError: (state) => {
      state.error = null;
    },

    // Complete logout - reset to initial state
    logout: () => initialState,
  },

  extraReducers: (builder) => {
    builder
      // ==================== SIGNUP ====================
      .addMatcher(authApi.endpoints.signup.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.signup.matchFulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.signup.matchRejected, (state, action) => {
        state.isLoading = false;
        state.error = extractErrorMessage(action.payload) || 'Signup failed';
        state.isAuthenticated = false;
      })

      // ==================== LOGIN ====================
      .addMatcher(authApi.endpoints.login.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        state.user = action.payload.data.user || null;
        state.accessToken = action.payload.data.accessToken || null;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
        state.isLoading = false;
        state.error = extractErrorMessage(action.payload) || 'Login failed';
        state.isAuthenticated = false;
      })

      // ==================== LOGOUT ====================
      .addMatcher(authApi.endpoints.logout.matchFulfilled, () => initialState)
      .addMatcher(authApi.endpoints.logout.matchRejected, () => initialState)

      // ==================== FORGOT PASSWORD ====================
      .addMatcher(authApi.endpoints.forgotPassword.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.forgotPassword.matchFulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.forgotPassword.matchRejected, (state, action) => {
        state.isLoading = false;
        state.error = extractErrorMessage(action.payload) || 'Failed to send reset link';
      })

      // ==================== RESET PASSWORD ====================
      .addMatcher(authApi.endpoints.resetPassword.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.resetPassword.matchFulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.resetPassword.matchRejected, (state, action) => {
        state.isLoading = false;
        state.error = extractErrorMessage(action.payload) || 'Password reset failed';
      })

      // ==================== VERIFY EMAIL ====================
      .addMatcher(authApi.endpoints.verifyEmail.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.verifyEmail.matchFulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        // Update user verification status if user exists
        if (state.user) {
          state.user.isEmailVerified = true;
        }
      })
      .addMatcher(authApi.endpoints.verifyEmail.matchRejected, (state, action) => {
        state.isLoading = false;
        state.error = extractErrorMessage(action.payload) || 'Email verification failed';
      })

      // ==================== RESEND VERIFY EMAIL ====================
      .addMatcher(authApi.endpoints.resendVerifyEmail.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.resendVerifyEmail.matchFulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.resendVerifyEmail.matchRejected, (state, action) => {
        state.isLoading = false;
        state.error = extractErrorMessage(action.payload) || 'Resend email verification failed';
      })

      // ==================== VERIFY 2FA ====================
      .addMatcher(authApi.endpoints.verify2FA.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.verify2FA.matchFulfilled, (state, action) => {
        state.user = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.verify2FA.matchRejected, (state, action) => {
        state.isLoading = false;
        state.error = extractErrorMessage(action.payload) || '2FA verification failed';
      })

      // ==================== ENABLE 2FA ====================
      .addMatcher(authApi.endpoints.enable2FA.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.enable2FA.matchFulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        // Update 2FA status if user exists
        if (state.user) {
          state.user.twoFactorEnabled = true;
        }
      })
      .addMatcher(authApi.endpoints.enable2FA.matchRejected, (state, action) => {
        state.isLoading = false;
        state.error = extractErrorMessage(action.payload) || 'Failed to enable 2FA';
      });
  },
});

export const {
  setUser,
  setAccessToken,
  setCredentials,
  setLoading,
  setError,
  clearError,
  logout,
} = authSlice.actions;

export default authSlice.reducer;