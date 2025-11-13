// src/services/authService/auth.api.ts

import { baseApi } from '@/lib/baseApi/base.api';
import type {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
  LogoutResponse,
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
  }),
  overrideExisting: false,
});

export const {
  useSignupMutation,
  useLoginMutation,
  useGoogleLoginMutation,
  useLogoutMutation,
} = authApi;
