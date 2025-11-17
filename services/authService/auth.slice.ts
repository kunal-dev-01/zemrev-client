// src/services/authService/auth.slice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
  AuthState,
  RegisteredUser,
  GuestUser,
  CreditInfo,
  Address
} from './types';
import { authApi } from './auth.api';

const initialState: AuthState = {
  userType: 'anonymous',
  registeredUser: null,
  guestUser: null,
  accessToken: null,
  fingerprint: null,
  credits: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Extract error message
export const extractErrorMessage = (error: unknown): string => {
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
    // Set registered user credentials
    setRegisteredCredentials: (
      state,
      action: PayloadAction<{ user: RegisteredUser; accessToken: string }>
    ) => {
      state.userType = 'registered';
      state.registeredUser = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.guestUser = null; // Clear guest when becoming registered
      state.fingerprint = null;
      state.isAuthenticated = true;
      state.error = null;
    },

    // Set guest user credentials
    setGuestCredentials: (
      state,
      action: PayloadAction<{ guest: GuestUser; fingerprint: string }>
    ) => {
      state.userType = 'guest';
      state.guestUser = action.payload.guest;
      state.fingerprint = action.payload.fingerprint;
      state.registeredUser = null; // Clear registered when becoming guest
      state.accessToken = null;
      state.isAuthenticated = false; // Guests are not "authenticated"
      state.error = null;
    },

    // Update access token (for refresh)
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      if (state.userType === 'registered') {
        state.isAuthenticated = true;
      }
    },

    // Set fingerprint
    setFingerprint: (state, action: PayloadAction<string>) => {
      state.fingerprint = action.payload;
    },

    // Update credits
    setCredits: (state, action: PayloadAction<CreditInfo>) => {
      state.credits = action.payload;
    },

    // Update registered user info
    updateRegisteredUser: (state, action: PayloadAction<Partial<RegisteredUser>>) => {
      if (state.registeredUser) {
        state.registeredUser = { ...state.registeredUser, ...action.payload };
      }
    },

    // Update Address
    updateAddress: (state, action: PayloadAction<Partial<Address>>) => {
      if (state.registeredUser) {
        state.registeredUser.address = { ...state.registeredUser.address, ...action.payload };
      }
    },

    // Update Full Name for registered user
    updateFullName: (state, action: PayloadAction<string>) => {
      if (state.registeredUser) {
        state.registeredUser.fullName = action.payload;
      }
    },

    // Update Phone Number for registered user
    updatePhoneNumber: (state, action: PayloadAction<string>) => {
      if (state.registeredUser) {
        state.registeredUser.phoneNumber = action.payload;
      }
    },

    // Update Email Verification Status
    updateEmailVerificationStatus: (state, action: PayloadAction<boolean>) => {
      if (state.registeredUser) {
        state.registeredUser.isEmailVerified = action.payload;
      }
    },

    // Convert registered to guest (when session expires)
    convertToGuest: (state) => {
      state.userType = 'guest';
      state.registeredUser = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      // Keep fingerprint for guest mode
    },

    // Loading state
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    // Error handling
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },

    clearError: (state) => {
      state.error = null;
    },

    // Complete logout
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
        state.userType = 'registered';
        state.registeredUser = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        state.guestUser = null;
        state.fingerprint = null;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.signup.matchRejected, (state, action) => {
        state.isLoading = false;
        state.error = extractErrorMessage(action.payload) || 'Signup failed';
      })

      // ==================== LOGIN ====================
      .addMatcher(authApi.endpoints.login.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        // Check if 2FA is required
        if (action.payload.data.requires2FA) {
          // Don't update state yet, wait for 2FA verification
          state.isLoading = false;
          return;
        }

        // Normal login success
        if (action.payload.data.user && action.payload.data.accessToken) {
          state.userType = 'registered';
          state.registeredUser = action.payload.data.user;
          state.accessToken = action.payload.data.accessToken;
          state.guestUser = null;
          state.fingerprint = null;
          state.isAuthenticated = true;
        }
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
        state.isLoading = false;
        state.error = extractErrorMessage(action.payload) || 'Login failed';
      })

      // ==================== VERIFY 2FA ====================
      .addMatcher(authApi.endpoints.verify2FA.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.verify2FA.matchFulfilled, (state, action) => {
        state.userType = 'registered';
        state.registeredUser = action.payload.data.user;
        state.accessToken = action.payload.data.accessToken;
        state.guestUser = null;
        state.fingerprint = null;
        state.isAuthenticated = true;
        state.isLoading = false;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.verify2FA.matchRejected, (state, action) => {
        state.isLoading = false;
        state.error = extractErrorMessage(action.payload) || '2FA verification failed';
      })

      // ==================== LOGOUT ====================
      .addMatcher(authApi.endpoints.logout.matchFulfilled, () => initialState)
      .addMatcher(authApi.endpoints.logout.matchRejected, () => initialState)

      // ==================== CREDIT STATUS ====================
      .addMatcher(authApi.endpoints.getCreditStatus.matchFulfilled, (state, action) => {
        const { userType, user, guest, credits } = action.payload.data;

        state.userType = userType;
        state.credits = credits;

        if (userType === 'registered' && user) {
          state.registeredUser = user;
          state.guestUser = null;
        } else if (userType === 'guest' && guest) {
          state.guestUser = guest;
          state.registeredUser = null;
        }
      })

      // ==================== EMAIL VERIFICATION ====================
      .addMatcher(authApi.endpoints.verifyEmail.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(authApi.endpoints.verifyEmail.matchFulfilled, (state) => {
        state.isLoading = false;
        state.error = null;
        if (state.registeredUser) {
          state.registeredUser.isEmailVerified = true;
        }
      })
      .addMatcher(authApi.endpoints.verifyEmail.matchRejected, (state, action) => {
        state.isLoading = false;
        state.error = extractErrorMessage(action.payload) || 'Email verification failed';
      })

      // ==================== FORGOT/RESET PASSWORD ====================
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
        state.error = extractErrorMessage(action.payload);
      })
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
        state.error = extractErrorMessage(action.payload);
      })

      // ==================== 2FA OPERATIONS ====================
      .addMatcher(authApi.endpoints.enable2FA.matchFulfilled, (state) => {
        if (state.registeredUser) {
          state.registeredUser.twoFactorEnabled = true;
        }
      })
      .addMatcher(authApi.endpoints.disable2FA.matchFulfilled, (state) => {
        if (state.registeredUser) {
          state.registeredUser.twoFactorEnabled = false;
        }
      });
  },
});

export const {
  setRegisteredCredentials,
  setGuestCredentials,
  setAccessToken,
  setFingerprint,
  setCredits,
  updateRegisteredUser,
  updateAddress,
  updateFullName,
  updatePhoneNumber,
  updateEmailVerificationStatus,
  convertToGuest,
  setLoading,
  setError,
  clearError,
  logout,
} = authSlice.actions;

export default authSlice.reducer;