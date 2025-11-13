import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '../reduxHooks/redux.hooks';
import {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useGoogleLoginMutation
} from '@/services/authService/auth.api';
import {
  logout as logoutAction,
  setError,
  clearError,
} from '@/services/authService/auth.slice';

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

  const isPublicRoute = typeof window !== 'undefined' && 
    ['/', '/auth/login', '/auth/signup', '/auth/verify-email'].some(
      (route) => window.location.pathname.startsWith(route)
    );

  const signup = useCallback(
    async (data: { fullName: string; email: string; password: string; planType: string }) => {
      try {
        dispatch(clearError());
        await signupMutation(data).unwrap();
        router.push('/dashboard');
        return true;
      } catch (err: any) {
        dispatch(setError(err?.data?.message || 'Signup failed'));
        return false;
      }
    },
    [signupMutation, dispatch, router]
  );

  const login = useCallback(
    async (data: { email: string; password: string }) => {
      try {
        dispatch(clearError());
        await loginMutation(data).unwrap();
        router.push('/dashboard');
        return true;
      } catch (err: any) {
        dispatch(setError(err?.data?.message || 'Login failed'));
        return false;
      }
    },
    [loginMutation, dispatch, router]
  );

  const logout = useCallback(async () => {
    try {
      await logoutMutation().unwrap();
    } finally {
      dispatch(logoutAction());
      router.push('/auth/login');
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
    isLoading ||
    isSigningUp ||
    isLoggingIn ||
    isLoggingOut ||
    isGoogleLoading;

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