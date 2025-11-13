// src/hooks/authHooks/auth.hooks.ts

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '../reduxHooks/redux.hooks';

import {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useGoogleLoginMutation,
} from '@/services/authService/auth.api';

import {
  logout as logoutAction,
  setError,
  clearError,
} from '@/services/authService/auth.slice';

import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';


const getApiErrorMessage = (
  error: FetchBaseQueryError | SerializedError | unknown
): string => {
  if (!error) return 'Something went wrong';
  if ('status' in (error as FetchBaseQueryError)) {
    const errData = (error as FetchBaseQueryError).data as { message?: string };
    return errData?.message || 'Request failed';
  }
  if ('message' in (error as SerializedError)) {
    return (error as SerializedError).message || 'Something went wrong';
  }

  return 'Unexpected error';
};


export const useAuth = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user, accessToken, isAuthenticated, isLoading, error } = useAppSelector(
    (state) => state.auth
  );

  const [signupMutation, { isLoading: isSigningUp }] = useSignupMutation();
  const [loginMutation, { isLoading: isLoggingIn }] = useLoginMutation();
  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation();
  const [googleLoginMutation, { isLoading: isGoogleLoading }] = useGoogleLoginMutation();


  // -----------------------------------------
  // SIGNUP
  // -----------------------------------------
  const signup = useCallback(
    async (data: { fullName: string; email: string; password: string; planType: string }) => {
      try {
        dispatch(clearError());
        await signupMutation(data).unwrap();
        return true;
      } catch (err: unknown) {
        dispatch(setError(getApiErrorMessage(err)));
        return false;
      }
    },
    [signupMutation, dispatch, router]
  );


  // -----------------------------------------
  // LOGIN
  // -----------------------------------------
  const login = useCallback(
    async (data: { email: string; password: string }) => {
      try {
        dispatch(clearError());
        await loginMutation(data).unwrap();
        router.push('/user/dashboard');
        return true;
      } catch (err: unknown) {
        dispatch(setError(getApiErrorMessage(err)));
        return false;
      }
    },
    [loginMutation, dispatch, router]
  );


  // -----------------------------------------
  // LOGOUT
  // -----------------------------------------
  const logout = useCallback(async () => {
    try {
      await logoutMutation().unwrap();
    } finally {
      dispatch(logoutAction());
      router.push('/auth/login');
      router.refresh();
    }
  }, [logoutMutation, dispatch, router]);


  // -----------------------------------------
  // GOOGLE LOGIN
  // -----------------------------------------
  const loginWithGoogle = useCallback(async () => {
    try {
      dispatch(clearError());
      await googleLoginMutation().unwrap();
    } catch (err: unknown) {
      dispatch(setError(getApiErrorMessage(err)));
    }
  }, [googleLoginMutation, dispatch]);


  // -----------------------------------------
  // HELPERS
  // -----------------------------------------
  const clearAuthError = useCallback(() => dispatch(clearError()), [dispatch]);

  const getDisplayName = useCallback(() => {
    if (!user) return 'Guest';
    return user.fullName || user.email?.split('@')[0] || 'User';
  }, [user]);

  const getCreditsRemaining = useCallback(() => {
    if (!user?.plan) return 0;
    return user.plan.dailyCredits - (user.creditsUsed || 0);
  }, [user]);

  const hasEnoughCredits = useCallback(
    (required: number = 1) => {
      if (!user?.plan) return false;
      const remaining = user.plan.dailyCredits - (user.creditsUsed || 0);
      return remaining >= required;
    },
    [user]
  );

  const combinedIsLoading =
    isLoading || isSigningUp || isLoggingIn || isLoggingOut || isGoogleLoading;


  // FINAL RETURN (CLEAN API)
  return {
    user,
    accessToken,
    isAuthenticated,
    isLoading: combinedIsLoading,
    error,

    signup,
    login,
    logout,
    loginWithGoogle,
    clearError: clearAuthError,

    getDisplayName,
    getCreditsRemaining,
    hasEnoughCredits,
  };
};
