import { baseApi } from '@/lib/baseApi/base.api';
import type { LogoutResponse, MeResponse } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<MeResponse, void>({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),
      providesTags: ['User'],
      transformErrorResponse: (response) => {
        if (response.status === 401) {
          return {
            message: 'Please login to continue',
            statusCode: 401,
          };
        }
        return response.data || { message: 'Failed to fetch user', statusCode: 500 };
      },
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
      transformResponse: (response: LogoutResponse) => {
        if (typeof window !== 'undefined') {
          localStorage.removeItem('persist:root');
        }
        return response;
      },
      transformErrorResponse: (response) => {
        return response.data || { message: 'Logout failed', statusCode: 500 };
      },
    }),

    checkAuth: builder.query<MeResponse, void>({
      query: () => ({
        url: '/auth/me',
        method: 'GET',
      }),
      providesTags: ['Auth'],
      transformErrorResponse: () => {
        return { message: 'Not authenticated', statusCode: 401 };
      },
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetMeQuery,
  useLazyGetMeQuery,
  useGoogleLoginMutation,
  useLogoutMutation,
  useCheckAuthQuery,
  useLazyCheckAuthQuery,
} = authApi;