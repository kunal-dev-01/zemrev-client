// src/services/authService/auth.api.ts

import { baseApi } from '@/lib/baseApi/base.api';
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  LogoutResponse,
  ForgotRequest,
  ForgotResponse,
  ResetPasswordRequest,
  ResetPasswordResponse,
  VerifyEmailResponse,
  Verify2FARequest,
  Verify2FAResponse,
  Setup2FAResponse,
  Enable2FARequest,
  Enable2FAResponse,
} from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ==================== SIGNUP ====================
    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (credentials) => ({
        url: '/auth/signup',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    // ==================== VERIFY EMAIL ====================
    verifyEmail: builder.mutation<VerifyEmailResponse, string>({
      query: (token) => ({
        url: `/auth/verify-email/${token}`,
        method: 'GET',
      }),
      invalidatesTags: ['Auth'],
    }),

    // ==================== LOGOUT ====================
    resendVerifyEmail : builder.mutation<ForgotResponse, ForgotRequest>({
      query : (credentials) => ({
        url : '/auth/resend-verification-email',
        method : 'POST',
        body : credentials
      }),
      invalidatesTags : ['Auth']
    }),

    // ==================== LOGIN ====================
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    // ==================== VERIFY 2FA ====================
    verify2FA: builder.mutation<Verify2FAResponse, Verify2FARequest>({
      query: (data) => ({
        url: '/auth/verify-2fa',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth'],
    }),

    // ==================== GOOGLE LOGIN ====================
    googleLogin: builder.mutation<void, void>({
      queryFn: () => {
        if (typeof window !== 'undefined') {
          window.location.href = `${API_BASE_URL}/auth/google`;
        }
        return { data: undefined };
      },
    }),

    // ==================== LOGOUT ====================
    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User', 'Auth'],
    }),

    // ==================== LOGOUT ALL DEVICES ====================
    logoutAll: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: '/auth/logout-all',
        method: 'POST',
      }),
      invalidatesTags: ['User', 'Auth'],
    }),

    // ==================== SETUP 2FA ====================
    setup2FA: builder.mutation<Setup2FAResponse, void>({
      query: () => ({
        url: '/auth/setup-2fa',
        method: 'POST',
      }),
    }),

    // ==================== ENABLE 2FA ====================
    enable2FA: builder.mutation<Enable2FAResponse, Enable2FARequest>({
      query: (data) => ({
        url: '/auth/enable-2fa',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    // ==================== FORGOT PASSWORD ====================
    forgotPassword: builder.mutation<ForgotResponse, ForgotRequest>({
      query: (credentials) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: credentials,
      }),
    }),

    // ==================== RESET PASSWORD ====================
    resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordRequest>({
      query: (credentials) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: credentials,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useSignupMutation,
  useVerifyEmailMutation,
  useResendVerifyEmailMutation,
  useLoginMutation,
  useVerify2FAMutation,
  useGoogleLoginMutation,
  useLogoutMutation,
  useLogoutAllMutation,
  useSetup2FAMutation,
  useEnable2FAMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = authApi;