// src/hooks/authHooks/auth.hooks.ts
'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '../reduxHooks/redux.hooks';
import {
  useLogoutMutation,
  useGoogleLoginMutation,
  useLazyGetMeQuery,
  useLazyGetGuestCreditsQuery,
  useGetMeQuery,
  useGetGuestCreditsQuery,
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

  // Select state from Redux store
  const {
    user,
    isAuthenticated,
    credits,
    creditType,
    isLoading,
    error,
  } = useAppSelector((state) => state.auth);

  // RTK Query hooks
  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation();
  const [googleLoginMutation, { isLoading: isGoogleLoading }] = useGoogleLoginMutation();
  const [getMe, { isLoading: isFetchingUser }] = useLazyGetMeQuery();
  const [getGuestCredits, { isLoading: isFetchingGuestCredits }] = useLazyGetGuestCreditsQuery();

  // Auto-fetch user data if authenticated
  const { isLoading: isAutoFetchingUser } = useGetMeQuery(undefined, {
    skip: !isAuthenticated || user !== null, // Skip if not authenticated or user already exists
    refetchOnMountOrArgChange: true,
  });

  // Auto-fetch guest credits if not authenticated
  const { isLoading: isAutoFetchingGuest } = useGetGuestCreditsQuery(undefined, {
    skip: isAuthenticated, // Skip if authenticated
    refetchOnMountOrArgChange: true,
  });

  // Logout function
  const logout = useCallback(async () => {
    try {
      await logoutMutation().unwrap();
      dispatch(logoutAction());
      router.push('/');
      router.refresh();
    } catch {
      // Fallback: logout even on error
      dispatch(logoutAction());
      router.push('/');
      router.refresh();
    }
  }, [logoutMutation, dispatch, router]);

  // Google login function
  const loginWithGoogle = useCallback(async () => {
    try {
      dispatch(clearError());
      await googleLoginMutation().unwrap();
    } catch {
      dispatch(setError('Failed to initiate Google login'));
    }
  }, [googleLoginMutation, dispatch]);

  // Refresh user data
  const refreshUserData = useCallback(async () => {
    try {
      dispatch(clearError());
      const response = await getMe().unwrap();

      if (response.user) {
        dispatch(setUser(response.user));
      }

      dispatch(setCredits({
        credits: response.credits,
        type: response.type,
      }));

      return true;
    } catch (error) {
      const err = error as { data?: { message?: string }; message?: string };
      const errorMessage = err?.data?.message || err?.message || 'Failed to fetch user data';
      dispatch(setError(errorMessage));
      return false;
    }
  }, [getMe, dispatch]);

  // Refresh guest credits
  const refreshGuestCredits = useCallback(async () => {
    try {
      const response = await getGuestCredits().unwrap();
      dispatch(setCredits({
        credits: response.credits,
        type: response.type,
      }));
      return true;
    } catch (error) {
      const err = error as { data?: { message?: string }; message?: string };
      const errorMessage = err?.data?.message || 'Failed to fetch credits';
      dispatch(setError(errorMessage));
      return false;
    }
  }, [getGuestCredits, dispatch]);

  // Refresh credits based on auth status
  const refreshCredits = useCallback(async () => {
    return isAuthenticated ? refreshUserData() : refreshGuestCredits();
  }, [isAuthenticated, refreshUserData, refreshGuestCredits]);

  // Deduct credits
  const deductCredits = useCallback((amount: number = 1) => {
    if (credits && credits.remaining >= amount) {
      dispatch(updateCredits({
        remaining: credits.remaining - amount,
        used: credits.used + amount,
      }));
    }
  }, [credits, dispatch]);

  // Check authentication
  const checkAuth = useCallback(async () => {
    if (isAuthenticated && user) {
      return true;
    }
    try {
      await refreshUserData();
      return true;
    } catch {
      return false;
    }
  }, [isAuthenticated, user, refreshUserData]);

  // Clear auth error
  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Get display name
  const getDisplayName = useCallback(() => {
    if (!user) return 'Guest';
    return user.name || user.email?.split('@')[0] || 'User';
  }, [user]);

  // Get avatar
  const getAvatar = useCallback(() => {
    return user?.avatar || null;
  }, [user]);

  // Credit helper functions
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
    return credits.remaining < credits.limit * 0.2; // Less than 20%
  }, [credits]);

  const isCriticalCredits = useCallback(() => {
    if (!credits) return false;
    return credits.remaining < credits.limit * 0.1; // Less than 10%
  }, [credits]);

  const hasEnoughCredits = useCallback((required: number = 1) => {
    return credits ? credits.remaining >= required : false;
  }, [credits]);

  // Combined loading state
  const combinedIsLoading = isLoading || isLoggingOut || isGoogleLoading || isFetchingUser ||
  isFetchingGuestCredits || isAutoFetchingUser || isAutoFetchingGuest;

  return {
    // User data
    user,
    isAuthenticated,

    // Credits data
    credits,
    creditType,

    // Loading states
    isLoading: combinedIsLoading,
    isLoggingOut,
    isFetchingUser,
    error,

    // Auth actions
    logout,
    loginWithGoogle,
    checkAuth,
    clearError: clearAuthError,

    // Data refresh
    refreshUserData,
    refreshCredits,

    // Credit actions
    deductCredits,

    // Helper functions
    getDisplayName,
    getAvatar,
    getPercentageUsed,
    getPercentageRemaining,
    isLowCredits: isLowCredits(),
    isCriticalCredits: isCriticalCredits(),
    hasEnoughCredits,
  };
};
