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
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useResendVerifyEmailMutation,
  useVerify2FAMutation,
  useSetup2FAMutation,
  useEnable2FAMutation
} from '@/services/authService/auth.api';

import {
  logout as logoutAction,
  setError,
  clearError,
} from '@/services/authService/auth.slice';

import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

// Extract error message
const extractApiErrorMessage = (error: FetchBaseQueryError | SerializedError | unknown): string => {
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

// Auth hook
export const useAuth = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Redux state
  const { user, accessToken, isAuthenticated, isLoading, error } = useAppSelector(
    (state) => state.auth
  );

  // RTK Query mutations
  const [signupMutation, { isLoading: isSigningUp }] = useSignupMutation();
  const [loginMutation, { isLoading: isLoggingIn }] = useLoginMutation();
  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation();
  const [logoutAllMutation, { isLoading: isLoggingOutAll }] = useLogoutAllMutation();
  const [googleLoginMutation, { isLoading: isGoogleLoading }] = useGoogleLoginMutation();
  const [forgotPasswordMutation, { isLoading: isForgotPasswordLoading }] = useForgotPasswordMutation();
  const [resetPasswordMutation, { isLoading: isResetPasswordLoading }] = useResetPasswordMutation();
  const [verifyEmailMutation, { isLoading: isVerifyingEmail }] = useVerifyEmailMutation();
  const [verify2FAMutation, { isLoading: isVerifying2FA }] = useVerify2FAMutation();
  const [setup2FAMutation, { isLoading: isSettingUp2FA }] = useSetup2FAMutation();
  const [enable2FAMutation, { isLoading: isEnabling2FA }] = useEnable2FAMutation();
  const [resendVerifyEmailMutation, { isLoading: isResendingVerifyEmail }] = useResendVerifyEmailMutation();

  // ==================== SIGNUP ====================
  const signup = useCallback(
    async (data: { fullName: string; email: string; password: string; planType: string }): Promise<boolean> => {
      try {
        dispatch(clearError());
        await signupMutation(data).unwrap();
        return true;
      } catch (err: unknown) {
        dispatch(setError(extractApiErrorMessage(err)));
        return false;
      }
    },
    [signupMutation, dispatch]
  );

  // ==================== VERIFY EMAIL ====================
  const verifyEmail = useCallback(
    async (token: string): Promise<boolean> => {
      try {
        dispatch(clearError());
        await verifyEmailMutation(token).unwrap();
        return true;
      } catch (err: unknown) {
        dispatch(setError(extractApiErrorMessage(err)));
        return false;
      }
    },
    [verifyEmailMutation, dispatch]
  );

  // ================= Resend Verify Email =================
  const resendVerifyEmail = useCallback(
    async (data:{email: string}): Promise<boolean> => {
      try {
        dispatch(clearError());
        await resendVerifyEmailMutation(data).unwrap();
        return true;
      } catch (err: unknown) {
        dispatch(setError(extractApiErrorMessage(err)));
        return false;
      }
    },
    [resendVerifyEmailMutation, dispatch]
  );

  // ==================== LOGIN ====================
  const login = useCallback(
    async (data: { email: string; password: string }): Promise<{ success: boolean; requires2FA?: boolean; tempToken?: string }> => {
      try {
        dispatch(clearError());
        const result = await loginMutation(data).unwrap();
        
        // Check if 2FA is required
        if (result.data.requires2FA && result.data.tempToken) {
          return { 
            success: true, 
            requires2FA: true, 
            tempToken: result.data.tempToken 
          };
        }
        
        router.push('/user/dashboard');
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
    async (data: { tempToken: string; totpCode: string; superKey?: string }): Promise<boolean> => {
      try {
        dispatch(clearError());
        await verify2FAMutation(data).unwrap();
        router.push('/user/dashboard');
        return true;
      } catch (err: unknown) {
        dispatch(setError(extractApiErrorMessage(err)));
        return false;
      }
    },
    [verify2FAMutation, dispatch, router]
  );

  // ==================== SETUP 2FA ====================
  const setup2FA = useCallback(
    async (): Promise<{ secret: string; qrCode: string } | null> => {
      try {
        dispatch(clearError());
        const result = await setup2FAMutation().unwrap();
        return result.data;
      } catch (err: unknown) {
        dispatch(setError(extractApiErrorMessage(err)));
        return null;
      }
    },
    [setup2FAMutation, dispatch]
  );

  // ==================== ENABLE 2FA ====================
  const enable2FA = useCallback(
    async (totpCode: string): Promise<boolean> => {
      try {
        dispatch(clearError());
        await enable2FAMutation({ totpCode }).unwrap();
        return true;
      } catch (err: unknown) {
        dispatch(setError(extractApiErrorMessage(err)));
        return false;
      }
    },
    [enable2FAMutation, dispatch]
  );

  // ==================== LOGOUT ====================
  const logout = useCallback(async (): Promise<void> => {
    try {
      await logoutMutation().unwrap();
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      dispatch(logoutAction());
      router.push('/auth/login');
      router.refresh();
    }
  }, [logoutMutation, dispatch, router]);

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
      await googleLoginMutation().unwrap();
    } catch (err: unknown) {
      dispatch(setError(extractApiErrorMessage(err)));
    }
  }, [googleLoginMutation, dispatch]);

  // ==================== FORGOT PASSWORD ====================
  const forgotPassword = useCallback(
    async (data: { email: string }): Promise<boolean> => {
      try {
        dispatch(clearError());
        await forgotPasswordMutation(data).unwrap();
        return true;
      } catch (err: unknown) {
        dispatch(setError(extractApiErrorMessage(err)));
        return false;
      }
    },
    [forgotPasswordMutation, dispatch]
  );

  // ==================== RESET PASSWORD ====================
  const resetPassword = useCallback(
    async (data: { resetPasswordToken: string; newPassword: string }): Promise<boolean> => {
      try {
        dispatch(clearError());
        await resetPasswordMutation(data).unwrap();
        return true;
      } catch (err: unknown) {
        dispatch(setError(extractApiErrorMessage(err)));
        return false;
      }
    },
    [resetPasswordMutation, dispatch]
  );

  // ==================== HELPER FUNCTIONS ====================
  
  // Clear auth error
  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  // Get user's display name
  const getDisplayName = useCallback((): string => {
    if (!user) return 'Guest';
    return user.fullName || user.email?.split('@')[0] || 'User';
  }, [user]);

  // Get user's remaining credits
  const getCreditsRemaining = useCallback((): number => {
    if (!user?.plan) return 0;
    return Math.max(0, user.plan.dailyCredits - (user.creditsUsed || 0));
  }, [user]);

  // Check if user has enough credits
  const hasEnoughCredits = useCallback(
    (required: number = 1): boolean => {
      if (!user?.plan) return false;
      const remaining = user.plan.dailyCredits - (user.creditsUsed || 0);
      return remaining >= required;
    },
    [user]
  );

  // Check if email is verified
  const isEmailVerified = useCallback((): boolean => {
    return user?.isEmailVerified ?? false;
  }, [user]);

  // Check if 2FA is enabled
  const is2FAEnabled = useCallback((): boolean => {
    return user?.twoFactorEnabled ?? false;
  }, [user]);

  // Combined loading state
  const combinedIsLoading =
    isLoading ||
    isSigningUp ||
    isLoggingIn ||
    isLoggingOut ||
    isLoggingOutAll ||
    isGoogleLoading ||
    isForgotPasswordLoading ||
    isResetPasswordLoading ||
    isVerifyingEmail ||
    isVerifying2FA ||
    isSettingUp2FA ||
    isEnabling2FA ||
    isResendingVerifyEmail;

  // ==================== RETURN API ====================
  return {
    // State
    user,
    accessToken,
    isAuthenticated,
    isLoading: combinedIsLoading,
    error,

    // Auth operations
    signup,
    verifyEmail,
    login,
    verify2FA,
    setup2FA,
    enable2FA,
    logout,
    logoutAll,
    loginWithGoogle,
    forgotPassword,
    resetPassword,
    resendVerifyEmail,

    // Utilities
    clearError: clearAuthError,
    getDisplayName,
    getCreditsRemaining,
    hasEnoughCredits,
    isEmailVerified,
    is2FAEnabled,
  };
};