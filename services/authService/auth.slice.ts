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
      Object.assign(state, {
        userType: 'registered',
        registeredUser: action.payload.user,
        accessToken: action.payload.accessToken,
        guestUser: null,
        fingerprint: null,
        isAuthenticated: true,
        error: null,
      });
    },

    setGuestCredentials: (
      state,
      action: PayloadAction<{ guest: GuestUser; fingerprint: string }>
    ) => {
      Object.assign(state, {
        userType: 'guest',
        guestUser: action.payload.guest,
        fingerprint: action.payload.fingerprint,
        registeredUser: null,
        accessToken: null,
        isAuthenticated: false,
        error: null,
      });
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
        Object.assign(state.registeredUser, action.payload);
      }
    },

    updateAddress: (state, action: PayloadAction<Partial<Address>>) => {
      if (state.registeredUser?.address) {
        Object.assign(state.registeredUser.address, action.payload);
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
      Object.assign(state, {
        userType: 'guest',
        registeredUser: null,
        accessToken: null,
        isAuthenticated: false,
      });
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
    // Helper to set registered user state
    const setRegisteredUserState = (
      state: AuthState,
      user: RegisteredUser,
      accessToken: string,
      isAuthenticated: boolean = true
    ) => {
      Object.assign(state, {
        userType: 'registered',
        registeredUser: user,
        accessToken,
        guestUser: null,
        fingerprint: null,
        isAuthenticated,
        isLoading: false,
        error: null,
      });
    };

    // Helper for pending state
    const setPendingState = (state: AuthState) => {
      state.isLoading = true;
      state.error = null;
    };

    // Helper for rejected state
    const setRejectedState = (state: AuthState, action: any, defaultMsg: string) => {
      state.isLoading = false;
      state.error = extractErrorMessage(action.payload) || defaultMsg;
    };

    builder
      // ==================== SIGNUP ====================
      .addMatcher(authApi.endpoints.signup.matchPending, setPendingState)
      .addMatcher(authApi.endpoints.signup.matchFulfilled, (state, action) => {
        const { user, accessToken, requiresPayment } = action.payload.data;
        setRegisteredUserState(state, user, accessToken, !requiresPayment);
      })
      .addMatcher(authApi.endpoints.signup.matchRejected, (state, action) => {
        setRejectedState(state, action, 'Signup failed');
      })

      // ==================== LOGIN ====================
      .addMatcher(authApi.endpoints.login.matchPending, setPendingState)
      .addMatcher(authApi.endpoints.login.matchFulfilled, (state, action) => {
        const { requires2FA, user, accessToken } = action.payload.data;
        
        if (requires2FA) {
          state.isLoading = false;
          return;
        }

        if (user && accessToken) {
          setRegisteredUserState(state, user, accessToken);
        }
      })
      .addMatcher(authApi.endpoints.login.matchRejected, (state, action) => {
        setRejectedState(state, action, 'Login failed');
      })

      // ==================== VERIFY 2FA ====================
      .addMatcher(authApi.endpoints.verify2FA.matchPending, setPendingState)
      .addMatcher(authApi.endpoints.verify2FA.matchFulfilled, (state, action) => {
        const { user, accessToken } = action.payload.data;
        setRegisteredUserState(state, user, accessToken);
      })
      .addMatcher(authApi.endpoints.verify2FA.matchRejected, (state, action) => {
        setRejectedState(state, action, '2FA verification failed');
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
      .addMatcher(authApi.endpoints.verifyEmail.matchPending, setPendingState)
      .addMatcher(authApi.endpoints.verifyEmail.matchFulfilled, (state) => {
        state.isLoading = false;
        if (state.registeredUser) {
          state.registeredUser.isEmailVerified = true;
        }
      })
      .addMatcher(authApi.endpoints.verifyEmail.matchRejected, (state, action) => {
        setRejectedState(state, action, 'Email verification failed');
      })

      // ==================== PASSWORD OPERATIONS ====================
      .addMatcher(authApi.endpoints.forgotPassword.matchPending, setPendingState)
      .addMatcher(authApi.endpoints.forgotPassword.matchFulfilled, (state) => {
        state.isLoading = false;
      })
      .addMatcher(authApi.endpoints.forgotPassword.matchRejected, (state, action) => {
        setRejectedState(state, action, 'Password reset failed');
      })

      .addMatcher(authApi.endpoints.resetPassword.matchPending, setPendingState)
      .addMatcher(authApi.endpoints.resetPassword.matchFulfilled, (state) => {
        state.isLoading = false;
      })
      .addMatcher(authApi.endpoints.resetPassword.matchRejected, (state, action) => {
        setRejectedState(state, action, 'Password reset failed');
      })

      // ==================== RESEND EMAIL ====================
      .addMatcher(authApi.endpoints.resendVerifyEmail.matchPending, setPendingState)
      .addMatcher(authApi.endpoints.resendVerifyEmail.matchFulfilled, (state) => {
        state.isLoading = false;
      })
      .addMatcher(authApi.endpoints.resendVerifyEmail.matchRejected, (state, action) => {
        setRejectedState(state, action, 'Email verification failed');
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