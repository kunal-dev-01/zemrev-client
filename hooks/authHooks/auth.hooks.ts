'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '../reduxHooks/redux.hooks';
import { 
  useLogoutMutation, 
  useGoogleLoginMutation,
  useLazyGetMeQuery 
} from '@/services/authService/auth.api';
import { 
  logout as logoutAction,
  setUser,
  setError,
  clearError 
} from '@/services/authService/auth.slice';

export const useAuth = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  const { user, isAuthenticated, isLoading, error } = useAppSelector(
    (state) => state.auth
  );

  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation();
  const [googleLoginMutation, { isLoading: isGoogleLoading }] = useGoogleLoginMutation();
  const [getMe, { isLoading: isFetchingUser }] = useLazyGetMeQuery();

  const logout = useCallback(async () => {
    try {
      await logoutMutation().unwrap();
      dispatch(logoutAction());
      router.push('/');
      router.refresh();
    } catch {
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

  const fetchUserAfterAuth = useCallback(async () => {
    try {
      dispatch(clearError());
      const response = await getMe().unwrap();
      dispatch(setUser(response.user));
      return true;
    } catch (error) {
      const err = error as { data?: { message?: string }; message?: string };
      const errorMessage = err?.data?.message || err?.message || 'Authentication failed';
      dispatch(setError(errorMessage));
      return false;
    }
  }, [getMe, dispatch]);

  const refreshUser = useCallback(async () => {
    try {
      const response = await getMe().unwrap();
      dispatch(setUser(response.user));
      return true;
    } catch (error) {
      const err = error as { data?: { message?: string }; message?: string };
      const errorMessage = err?.data?.message || 'Failed to fetch user data';
      dispatch(setError(errorMessage));
      return false;
    }
  }, [getMe, dispatch]);

  const checkAuth = useCallback(async () => {
    if (isAuthenticated && user) {
      return true;
    }
    
    try {
      await refreshUser();
      return true;
    } catch {
      return false;
    }
  }, [isAuthenticated, user, refreshUser]);

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const getDisplayName = useCallback(() => {
    if (!user) return 'Guest';
    return user.name || user.email.split('@')[0];
  }, [user]);

  const getAvatar = useCallback(() => {
    return user?.avatar || null;
  }, [user]);

  return {
    user,
    isAuthenticated,
    isLoading: isLoading || isLoggingOut || isGoogleLoading || isFetchingUser,
    isLoggingOut,
    isFetchingUser,
    error,
    logout,
    loginWithGoogle,
    fetchUserAfterAuth,
    refreshUser,
    checkAuth,
    clearError: clearAuthError,
    getDisplayName,
    getAvatar,
  };
};