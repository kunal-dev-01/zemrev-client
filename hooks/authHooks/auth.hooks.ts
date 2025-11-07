// src/hooks/authHooks/auth.hooks.ts

'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '../reduxHooks/redux.hooks';
import {
  useLogoutMutation,
  useGoogleLoginMutation,
  useLazyGetMeQuery,
  useGetMeQuery,
} from '@/services/authService/auth.api';
import {
  logout as logoutAction,
  setUser,
  setCredits,
  updateCredits,
  setError,
  clearError,
} from '@/services/authService/auth.slice';

export const useAuth = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { user, isAuthenticated, credits, isLoading, error } = useAppSelector(
    (state) => state.auth
  );

  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation();
  const [googleLoginMutation, { isLoading: isGoogleLoading }] = useGoogleLoginMutation();
  const [getMe, { isLoading: isFetchingUser }] = useLazyGetMeQuery();

  const { isLoading: isAutoFetchingUser } = useGetMeQuery(undefined, {
    skip: !isAuthenticated || !!user,
    refetchOnMountOrArgChange: true,
  });

  const logout = useCallback(async () => {
    try {
      await logoutMutation().unwrap();
    } finally {
      dispatch(logoutAction());
      router.push('/');
      router.refresh();
    }
  }, [logoutMutation, dispatch, router]);

  const loginWithGoogle = useCallback(async () => {
    try {
      dispatch(clearError());
      await googleLoginMutation().unwrap();
    } catch {
      dispatch(setError('Failed to initiate Google login'));
    }
  }, [googleLoginMutation, dispatch]);

  const refreshUserData = useCallback(async () => {
    try {
      dispatch(clearError());
      const res = await getMe().unwrap();
      dispatch(setUser(res.user));
      dispatch(setCredits(res.credits));
      return true;
    } catch (err: any) {
      const msg = err?.data?.message || err?.message || 'Failed to fetch user';
      dispatch(setError(msg));
      return false;
    }
  }, [getMe, dispatch]);

  const refreshCredits = refreshUserData; 

  const deductCredits = useCallback(
    (amount: number = 1) => {
      if (credits && credits.remaining >= amount) {
        dispatch(updateCredits({ remaining: credits.remaining - amount, used: credits.used + amount }));
      }
    },
    [credits, dispatch]
  );

  const checkAuth = useCallback(async () => {
    if (isAuthenticated && user) return true;
    return refreshUserData();
  }, [isAuthenticated, user, refreshUserData]);

  const clearAuthError = useCallback(() => dispatch(clearError()), [dispatch]);

  const getDisplayName = useCallback(() => {
    if (!user) return 'Guest';
    return user.name || user.email?.split('@')[0] || 'User';
  }, [user]);

  const getAvatar = useCallback(() => user?.avatar || null, [user]);

  const getPercentageUsed = useCallback(() => {
    if (!credits || credits.limit === 0) return 0;
    return Math.round((credits.used / credits.limit) * 100);
  }, [credits]);

  const getPercentageRemaining = useCallback(() => {
    if (!credits || credits.limit === 0) return 0;
    return Math.round((credits.remaining / credits.limit) * 100);
  }, [credits]);

  const isLowCredits = useCallback(() => {
    if (!credits) return false;
    return credits.remaining < credits.limit * 0.2;
  }, [credits]);

  const isCriticalCredits = useCallback(() => {
    if (!credits) return false;
    return credits.remaining < credits.limit * 0.1;
  }, [credits]);

  const hasEnoughCredits = useCallback(
    (required: number = 1) => (credits ? credits.remaining >= required : false),
    [credits]
  );

  const combinedIsLoading =
    isLoading ||
    isLoggingOut ||
    isGoogleLoading ||
    isFetchingUser ||
    isAutoFetchingUser;

  return {
    user,
    isAuthenticated,
    credits,
    isLoading: combinedIsLoading,
    isLoggingOut,
    isFetchingUser,
    error,

    logout,
    loginWithGoogle,
    checkAuth,
    clearError: clearAuthError,

    refreshUserData,
    refreshCredits,

    deductCredits,

    getDisplayName,
    getAvatar,
    getPercentageUsed,
    getPercentageRemaining,
    isLowCredits: isLowCredits(),
    isCriticalCredits: isCriticalCredits(),
    hasEnoughCredits,
  };
};