// src/hooks/authHooks/auth.hooks.ts

import { useCallback, useEffect } from 'react';
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
  useGetCreditStatusQuery,
  useLazyGetCreditStatusQuery,
} from '@/services/authService/auth.api';
import {
  logout as logoutAction,
  setError,
  clearError,
  setFingerprint
} from '@/services/authService/auth.slice';
import { getFingerprint } from '@/utils/fingerprint.util';
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

export const useAuth = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  // Redux state
  const {
    userType,
    registeredUser,
    guestUser,
    accessToken,
    fingerprint: storedFingerprint,
    credits,
    isAuthenticated,
    isLoading,
    error,
  } = useAppSelector((state) => state.auth);

  // RTK Query mutations
  const [signupMutation, { isLoading: isSigningUp }] = useSignupMutation();
  const [loginMutation, { isLoading: isLoggingIn }] = useLoginMutation();
  const [logoutMutation, { isLoading: isLoggingOut }] = useLogoutMutation();
  const [logoutAllMutation, { isLoading: isLoggingOutAll }] = useLogoutAllMutation();
  const [googleLoginMutation, { isLoading: isGoogleLoading }] = useGoogleLoginMutation();
  const [forgotPasswordMutation, { isLoading: isForgotPasswordLoading }] =
    useForgotPasswordMutation();
  const [resetPasswordMutation, { isLoading: isResetPasswordLoading }] = useResetPasswordMutation();
  const [verifyEmailMutation, { isLoading: isVerifyingEmail }] = useVerifyEmailMutation();
  const [verify2FAMutation, { isLoading: isVerifying2FA }] = useVerify2FAMutation();
  const [resendVerifyEmailMutation, { isLoading: isResendingVerifyEmail }] =
    useResendVerifyEmailMutation();

  // Credit status query
  const { refetch: refetchCredits } = useGetCreditStatusQuery();
  const [triggerGetCredits] = useLazyGetCreditStatusQuery();

  // ==================== INITIALIZE GUEST USER ====================
  useEffect(() => {
    const initializeGuest = async () => {
      // Only initialize if anonymous
      if (userType === 'anonymous' && !storedFingerprint) {
        try {
          const fp = await getFingerprint();
          dispatch(setFingerprint(fp));

          // Fetch credit status to initialize guest
          await triggerGetCredits().unwrap();
        } catch (error) {
          console.error('Failed to initialize guest user:', error);
        }
      }
    };

    initializeGuest();
  }, [userType, storedFingerprint, dispatch, triggerGetCredits]);

  // ==================== SIGNUP ====================
  const signup = useCallback(
    async (data: {
      fullName: string;
      email: string;
      password: string;
      planType: string;
    }): Promise<boolean> => {
      try {
        dispatch(clearError());
        await signupMutation(data).unwrap();
        router.push('/user/dashboard');
        return true;
      } catch (err: unknown) {
        dispatch(setError(extractApiErrorMessage(err)));
        return false;
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
    async (data: {
      tempToken: string;
      totpCode: string;
      superKey?: string;
      isBackupCode?: boolean;
    }): Promise<boolean> => {
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

  // ==================== RESEND VERIFY EMAIL ====================
  const resendVerifyEmail = useCallback(
    async (data: { email: string }): Promise<boolean> => {
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

  // ==================== REFRESH CREDITS ====================
  const refreshCredits = useCallback(async () => {
    try {
      await refetchCredits();
    } catch (err) {
      console.error('Failed to refresh credits:', err);
    }
  }, [refetchCredits]);

  // ==================== HELPER FUNCTIONS ====================

  const clearAuthError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const getDisplayName = useCallback((): string => {
    if (userType === 'registered' && registeredUser) {
      return registeredUser.fullName || registeredUser.email.split('@')[0] || 'User';
    }
    return 'Guest';
  }, [userType, registeredUser]);

  const getCreditsRemaining = useCallback((): number | string => {
    if (!credits) return 0;
    return credits.remaining;
  }, [credits]);

  const hasEnoughCredits = useCallback(
    (required: number = 1): boolean => {
      if (!credits) return false;
      if (credits.isUnlimited) return true;
      return typeof credits.remaining === 'number' && credits.remaining >= required;
    },
    [credits]
  );

  const isEmailVerified = useCallback((): boolean => {
    if (userType !== 'registered' || !registeredUser) return false;
    return registeredUser.isEmailVerified;
  }, [userType, registeredUser]);

  const is2FAEnabled = useCallback((): boolean => {
    if (userType !== 'registered' || !registeredUser) return false;
    return registeredUser.twoFactorEnabled;
  }, [userType, registeredUser]);

  // ==================== USER TYPE CHECKS ====================
  const isGuest = userType === 'guest';
  const isRegistered = userType === 'registered';
  const isAnonymous = userType === 'anonymous';

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
    isResendingVerifyEmail;

  // ==================== RETURN API ====================
  return {
    // User info
    userType,
    registeredUser,
    guestUser,
    accessToken,
    credits,
    isAuthenticated,
    isGuest,
    isRegistered,
    isAnonymous,

    // Status
    isLoading: combinedIsLoading,
    error,

    // Auth operations
    signup,
    verifyEmail,
    resendVerifyEmail,
    login,
    verify2FA,
    logout,
    logoutAll,
    loginWithGoogle,
    forgotPassword,
    resetPassword,

    // Credit operations
    refreshCredits,

    // Utilities
    clearError: clearAuthError,
    getDisplayName,
    getCreditsRemaining,
    hasEnoughCredits,
    isEmailVerified,
    is2FAEnabled,
  };
};