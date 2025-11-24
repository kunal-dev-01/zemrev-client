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
import { getFingerprint } from '@/utils/fingerprint.util';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: 'include',
  prepareHeaders: async (headers, { getState }) => {
    const state = getState() as RootState;
    const { accessToken, userType, fingerprint: storedFingerprint } = state.auth;

    // ✅ ALWAYS send fingerprint (for tracking + guest identification)
    try {
      const fingerprint = storedFingerprint || await getFingerprint();
      headers.set('X-Fingerprint', fingerprint);
    } catch (error) {
      console.error('Failed to set fingerprint header:', error);
    }

    // ✅ Add access token for registered users
    if (accessToken && userType === 'registered') {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    // ✅ Set Content-Type if not already set
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

  // ✅ Handle 401 Unauthorized
  if (result.error?.status === 401) {
    const state = api.getState() as RootState;
    
    if (state.auth.userType === 'registered') {
      // ✅ Try to refresh token
      const refreshResult = await baseQueryWithAuth(
        { url: '/auth/refresh-token', method: 'POST' },
        api,
        extraOptions
      );

      if (refreshResult.data) {
        const { setAccessToken } = await import('@/services/authService/auth.slice');
        const data = refreshResult.data as RefreshTokenResponse;
        api.dispatch(setAccessToken(data.data.accessToken));

        // ✅ Retry original request
        result = await baseQueryWithAuth(args, api, extraOptions);
      } else {
        // ✅ Refresh failed - convert to guest
        const { convertToGuest } = await import('@/services/authService/auth.slice');
        api.dispatch(convertToGuest());

        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login';
        }
      }
    }
    // ✅ For guest/anonymous - 401 is expected, don't redirect
  }

  // ✅ Log errors in development
  if (result.error && process.env.NODE_ENV === 'development') {
    console.log('🔴 API Error:', result.error);
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Auth', 'Credits'],
  endpoints: () => ({}),
});