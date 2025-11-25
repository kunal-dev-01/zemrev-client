// src/hooks/authHooks/auth.hooks.ts

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '../reduxHooks/redux.hooks';
import {
  useSignupMutation,
  useLoginMutation,
  useLogoutMutation,
  useLogoutAllMutation,
  useGoogleLoginMutation,
  useVerify2FAMutation,
} from '@/services/authService/auth.api';
import {
  logout as logoutAction,
  setError,
  clearError,
  setFingerprint,
} from '@/services/authService/auth.slice';
import { getFingerprint } from '@/utils/fingerprint.util';
import { extractApiErrorMessage } from '@/utils/errorExtract.utils';

export const useAuth = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const {
    userType,
    registeredUser,
    guestUser,
    accessToken,
    credits,
    isAuthenticated,
    isLoading,
    error,
  } = useAppSelector((state) => state.auth);

  const [signupMutation, { isLoading: isSigningUp }] = useSignupMutation();
  const [loginMutation, { isLoading: isLoggingIn }] = useLoginMutation();
  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation();
  const [logoutAllMutation, { isLoading: isLoggingOutAll }] = useLogoutAllMutation();
  const [googleLoginMutation, { isLoading: isGoogleLoading }] = useGoogleLoginMutation();
  const [verify2FAMutation, { isLoading: isVerifying2FA }] = useVerify2FAMutation();

  // ==================== SIGNUP ====================
  const signup = useCallback(
    async (data: {
      fullName: string;
      email: string;
      password: string;
    }): Promise<{ success: boolean; requiresPayment?: boolean; checkoutUrl?: string }> => {
      try {
        dispatch(clearError());

        const fp = await getFingerprint();
        dispatch(setFingerprint(fp));

        await signupMutation(data).unwrap();

        return { success: true };
      } catch (err: unknown) {
        dispatch(setError(extractApiErrorMessage(err)));
        return { success: false };
      }
    },
    [signupMutation, dispatch, router]
  );

  // ==================== LOGIN ====================
  const login = useCallback(
    async (data: {
      email: string;
      password: string;
    }): Promise<{ success: boolean; requires2FA?: boolean; tempToken?: string }> => {
      try {
        dispatch(clearError());
        const result = await loginMutation(data).unwrap();

        if (result.data.requires2FA && result.data.tempToken) {
          return {
            success: true,
            requires2FA: true,
            tempToken: result.data.tempToken,
          };
        }

        router.push('/user?page=dashboard');
        return { success: true };
      } catch (err: unknown) {
        dispatch(setError(extractApiErrorMessage(err)));
        return { success: false };
      }
    },
    [loginMutation, dispatch, router]
  );

  // ==================== VERIFY 2FA ====================
  const verify2FA = useCallback(
    async (data: {
      tempToken: string;
      totpCode: string;
      superKey?: string;
      isBackupCode?: boolean;
    }): Promise<boolean> => {
      try {
        dispatch(clearError());
        await verify2FAMutation(data).unwrap();
        router.push('/user?page=dashboard');
        return true;
      } catch (err: unknown) {
        dispatch(setError(extractApiErrorMessage(err)));
        return false;
      }
    },
    [verify2FAMutation, dispatch, router]
  );

  // ==================== LOGOUT ====================
  const logout = useCallback(async (): Promise<void> => {
    try {
      if (userType === 'registered') {
        await logoutMutation().unwrap();
      }
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      dispatch(logoutAction());
      router.push('/auth/login');
      router.refresh();
    }
  }, [logoutMutation, dispatch, router, userType]);

  // ==================== LOGOUT ALL ====================
  const logoutAll = useCallback(async (): Promise<boolean> => {
    try {
      await logoutAllMutation().unwrap();
      dispatch(logoutAction());
      router.push('/auth/login');
      router.refresh();
      return true;
    } catch (err) {
      console.error('Logout all error:', err);
      dispatch(setError(extractApiErrorMessage(err)));
      return false;
    }
  }, [logoutAllMutation, dispatch, router]);

  // ==================== GOOGLE LOGIN ====================
  const loginWithGoogle = useCallback(async (): Promise<void> => {
    try {
      dispatch(clearError());

      const fp = await getFingerprint();
      dispatch(setFingerprint(fp));

      await googleLoginMutation().unwrap();
    } catch (err: unknown) {
      dispatch(setError(extractApiErrorMessage(err)));
    }
  }, [googleLoginMutation, dispatch]);

  // ==================== CLEAR ERROR ====================
  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const combinedIsLoading =
    isLoading || isSigningUp || isLoggingIn || isLoggingOut || isLoggingOutAll || isGoogleLoading || isVerifying2FA;

  return {
    // State
    userType,
    registeredUser,
    guestUser,
    accessToken,
    credits,
    isAuthenticated,
    isLoading: combinedIsLoading,
    error,

    // Operations
    signup,
    login,
    verify2FA,
    logout,
    logoutAll,
    loginWithGoogle,
    clearError: clearAuthError,
  };
};