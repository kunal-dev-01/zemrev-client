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
  ResetPasswordResponse
} from './types';
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    signup: builder.mutation<SignupResponse, SignupRequest>({
      query: (credentials) => ({
        url: '/auth/signup',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    googleLogin: builder.mutation<void, void>({
      queryFn: () => {
        if (typeof window !== 'undefined') {
          window.location.href = `${API_BASE_URL}/auth/google`;
        }
        return { data: undefined };
      },
    }),

    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      invalidatesTags: ['User', 'Auth'],
    }),

    forgotPassword: builder.mutation<ForgotResponse, ForgotRequest>({
      query: (credentials) => ({
        url: '/auth/forgot-password',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    }),

    resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordRequest>({
      query: (credentials) => ({
        url: '/auth/reset-password',
        method: 'POST',
        body: credentials,
      }),
      invalidatesTags: ['Auth'],
    })

  }),
  overrideExisting: false,
});

export const {
  useSignupMutation,
  useLoginMutation,
  useGoogleLoginMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation
} = authApi;
