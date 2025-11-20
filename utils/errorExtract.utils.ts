// utils/errorExtract.utils.ts

import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

export const extractApiErrorMessage = (error: FetchBaseQueryError | SerializedError | unknown): string => {
  if (!error) return 'Something went wrong';
  if ('status' in (error as FetchBaseQueryError)) {
    const fetchError = error as FetchBaseQueryError;
    const errorData = fetchError.data as {
      message?: string;
      error?: string;
    };
    return errorData?.message || errorData?.error || 'Request failed';
  }
  if ('message' in (error as SerializedError)) {
    return (error as SerializedError).message || 'Something went wrong';
  }
  return 'Unexpected error occurred';
};


export const extractErrorMessage = (error: unknown): string => {
  if (!error) return 'An unexpected error occurred';
  if (typeof error === 'string') return error;

  if (typeof error === 'object') {
    const err = error as Record<string, any>;
    if ('data' in err && err.data) {
      const { message, error: errorMsg } = err.data;
      return message || errorMsg || 'Request failed';
    }
    const { message, error: errorMsg } = err;
    return message || errorMsg || 'An unexpected error occurred';
  }

  return 'An unexpected error occurred';
};