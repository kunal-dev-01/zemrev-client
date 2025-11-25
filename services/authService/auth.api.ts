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
  Disable2FARequest,
  Disable2FAResponse,
  RegenerateBackupCodesRequest,
  RegenerateBackupCodesResponse,
  CreditStatusResponse,
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
      invalidatesTags: ['Auth', 'Credits'],
    }),

    // ==================== VERIFY EMAIL ====================
    verifyEmail: builder.mutation<VerifyEmailResponse, string>({
      query: (token) => ({
        url: `/verify/verify-email/${token}`,
        method: 'GET',
      }),
      invalidatesTags: ['Auth'],
    }),

    // ==================== RESEND VERIFY EMAIL ====================
    resendVerifyEmail: builder.mutation<ForgotResponse, ForgotRequest>({
      query: (credentials) => ({
        url: '/verify/resend-verification-email',
        method: 'POST',
        body: credentials,
      }),
    }),

    // ==================== LOGIN ====================
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth', 'Credits'],
    }),

    // ==================== VERIFY 2FA ====================
    verify2FA: builder.mutation<Verify2FAResponse, Verify2FARequest>({
      query: (data) => ({
        url: '/auth/verify-2fa',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Auth', 'Credits'],
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
      invalidatesTags: ['User', 'Auth', 'Credits'],
    }),

    // ==================== LOGOUT ALL DEVICES ====================
    logoutAll: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: '/auth/logout-all',
        method: 'POST',
      }),
      invalidatesTags: ['User', 'Auth', 'Credits'],
    }),

     // ==================== SETUP 2FA ====================
    setup2FA: builder.mutation<Setup2FAResponse, void>({
      query: () => ({
        url: '/verify/2fa/setup',
        method: 'POST',
      }),
    }),

    // ==================== ENABLE 2FA ====================
    enable2FA: builder.mutation<Enable2FAResponse, Enable2FARequest>({
      query: (data) => ({
        url: '/verify/2fa/enable',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    // ==================== DISABLE 2FA ====================
    disable2FA: builder.mutation<Disable2FAResponse, Disable2FARequest>({
      query: (data) => ({
        url: '/verify/2fa/disable',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),

    // ==================== REGENERATE BACKUP CODES ====================
    regenerateBackupCodes: builder.mutation<RegenerateBackupCodesResponse,
      RegenerateBackupCodesRequest
    >({
      query: (data) => ({
        url: '/verify/2fa/regenerate-backup-codes',
        method: 'POST',
        body: data,
      }),
    }),

    // ==================== FORGOT PASSWORD ====================
    forgotPassword: builder.mutation<ForgotResponse, ForgotRequest>({
      query: (credentials) => ({
        url: '/verify/forgot-password',
        method: 'POST',
        body: credentials,
      }),
    }),

    // ==================== RESET PASSWORD ====================
    resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordRequest>({
      query: (credentials) => ({
        url: '/verify/reset-password',
        method: 'POST',
        body: credentials,
      }),
    }),

    // ==================== GET CREDIT STATUS ====================
    getCreditStatus: builder.query<CreditStatusResponse, void>({
      query: () => ({
        url: `/credit/status`,
        method: 'GET',
      }),
      providesTags: ['Credits'],
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
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useGetCreditStatusQuery,
  useLazyGetCreditStatusQuery,
  useSetup2FAMutation,
  useEnable2FAMutation,
  useDisable2FAMutation,
  useRegenerateBackupCodesMutation
} = authApi;