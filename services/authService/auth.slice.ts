// src/services/authService/auth.slice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { extractErrorMessage } from '@/utils/errorExtract.utils';
import type {
  AuthState,
  RegisteredUser,
  GuestUser,
  CreditInfo,
  Address,
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

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRegisteredCredentials: (
      state,
      action: PayloadAction<{ user: RegisteredUser; accessToken: string }>
    ) => {
      state.userType = 'registered';
      state.registeredUser = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.guestUser = null;
      state.fingerprint = null;
      state.isAuthenticated = true;
      state.error = null;
    },

    setGuestCredentials: (
      state,
      action: PayloadAction<{ guest: GuestUser; fingerprint: string }>
    ) => {
      state.userType = 'guest';
      state.guestUser = action.payload.guest;
      state.fingerprint = action.payload.fingerprint;
      state.registeredUser = null;
      state.accessToken = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
      if (state.userType === 'registered') {
        state.isAuthenticated = true;
      }
    },

    setFingerprint: (state, action: PayloadAction<string>) => {
      state.fingerprint = action.payload;
    },

    setCredits: (state, action: PayloadAction<CreditInfo>) => {
      state.credits = action.payload;
    },

    updateRegisteredUser: (state, action: PayloadAction<Partial<RegisteredUser>>) => {
      if (state.registeredUser) {
        state.registeredUser = { ...state.registeredUser, ...action.payload };
      }
    },

    updateAddress: (state, action: PayloadAction<Partial<Address>>) => {
      if (state.registeredUser) {
        state.registeredUser.address = {
          ...state.registeredUser.address,
          ...action.payload,
        };
      }
    },

    updateFullName: (state, action: PayloadAction<string>) => {
      if (state.registeredUser) {
        state.registeredUser.fullName = action.payload;
      }
    },

    updateEmailVerificationStatus: (state, action: PayloadAction<boolean>) => {
      if (state.registeredUser) {
        state.registeredUser.isEmailVerified = action.payload;
      }
    },

    update2FAStatus: (state, action: PayloadAction<boolean>) => {
      if (state.registeredUser) {
        state.registeredUser.twoFactorEnabled = action.payload;
      }
    },

    convertToGuest: (state) => {
      state.userType = 'guest';
      state.registeredUser = null;
      state.accessToken = null;
      state.isAuthenticated = false;
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
        // ✅ UPDATED: Don't auto-authenticate if payment required
        if (action.payload.data.requiresPayment) {
          // User created but not active yet
          state.userType = 'registered';
          state.registeredUser = action.payload.data.user;
          state.accessToken = action.payload.data.accessToken;
          state.isAuthenticated = false;  // Not fully authenticated until payment
          state.isLoading = false;
          return;
        }

        // Normal signup (no payment required - shouldn't happen now)
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
        if (action.payload.data.requires2FA) {
          state.isLoading = false;
          return;
        }

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

      // =================== Resend Email ====================
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
        state.error = extractErrorMessage(action.payload) || 'Email verification failed';
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
  updateEmailVerificationStatus,
  update2FAStatus,
  convertToGuest,
  setLoading,
  setError,
  clearError,
  logout,
} = authSlice.actions;

export default authSlice.reducer;