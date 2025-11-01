import { 
  createApi, 
  fetchBaseQuery, 
  BaseQueryFn, 
  FetchArgs, 
  FetchBaseQueryError 
} from '@reduxjs/toolkit/query/react';
import type { ApiError } from '@/services/authService/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === 'object' &&
    error !== null &&
    'success' in error &&
    'message' in error &&
    'statusCode' in error
  );
};

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: 'include',
  prepareHeaders: (headers) => {
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
  const result = await baseQueryWithAuth(args, api, extraOptions);

  if (result.error?.status === 401) {
    const { logout } = await import('@/services/authService/auth.slice');
    api.dispatch(logout());
    
    if (typeof window !== 'undefined') {
      window.location.href = '/';
    }
  }

  if (result.error && process.env.NODE_ENV === 'development') {
    const errorData = result.error.data;
    
    if (isApiError(errorData)) {
      console.error('🔴 API Error:', {
        message: errorData.message,
        status: errorData.statusCode,
        errors: errorData.errors,
      });
    } else {
      console.error('🔴 Network Error:', result.error);
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User', 'Auth'],
  endpoints: () => ({}),
});