// lib/baseApi/base.api.ts

import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import type { RootState } from '@/lib/redux/store';
import { RefreshTokenResponse } from '@/services/authService/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;

    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }

    if (!headers.has('Content-Type')) {
      headers.set('Content-Type', 'application/json');
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQueryWithAuth(args, api, extraOptions);

  if (result.error?.status === 401) {
    const refreshResult = await baseQueryWithAuth(
      { url: '/auth/refresh-token', method: 'POST' },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { setAccessToken } = await import('@/services/authService/auth.slice');
      const data = refreshResult.data as RefreshTokenResponse;
      api.dispatch(setAccessToken(data.data.accessToken));

      result = await baseQueryWithAuth(args, api, extraOptions);
    } else {
      const { logout } = await import('@/services/authService/auth.slice');
      api.dispatch(logout());

      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    }
  }

  if (result.error && process.env.NODE_ENV === 'development') {
    console.error('🔴 API Error:', result.error);
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Auth'],
  endpoints: () => ({}),
});