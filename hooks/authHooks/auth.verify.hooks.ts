// src/hooks/authHooks/auth.verify.hooks.ts

import { useCallback } from "react";
import { useAppSelector, useAppDispatch } from "../reduxHooks/redux.hooks";
import {
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useVerifyEmailMutation,
  useResendVerifyEmailMutation,
  useGetCreditStatusQuery,
  useLazyGetCreditStatusQuery,
} from "@/services/authService/auth.api";
import {
  setError,
  clearError,
  setFingerprint,
  setGuestCredentials,
  setCredits,
  updateEmailVerificationStatus,
} from "@/services/authService/auth.slice";
import { getFingerprint } from "@/utils/fingerprint.util";
import { extractApiErrorMessage } from "@/utils/errorExtract.utils";

export const useAuthVerify = () => {
  const dispatch = useAppDispatch();

  const {
    userType,
    registeredUser,
    guestUser,
    fingerprint: storedFingerprint,
    credits,
    isLoading,
  } = useAppSelector((state) => state.auth);

  const [forgotPasswordMutation, { isLoading: isForgotPasswordLoading }] =
    useForgotPasswordMutation();
  const [resetPasswordMutation, { isLoading: isResetPasswordLoading }] =
    useResetPasswordMutation();
  const [verifyEmailMutation, { isLoading: isVerifyingEmail }] =
    useVerifyEmailMutation();
  const [resendVerifyEmailMutation, { isLoading: isResendingVerifyEmail }] =
    useResendVerifyEmailMutation();

  const { refetch: refetchCredits } = useGetCreditStatusQuery(undefined, {
    skip: true,
  });
  const [triggerGetCredits, { isLoading: isFetchingCredits }] = useLazyGetCreditStatusQuery();

  // ==================== INITIALIZE GUEST ====================
  const initializeGuest = useCallback(async (): Promise<boolean> => {
    try {
      // Already registered → no need for guest
      if (userType === "registered") return true;
      
      // Already guest → no need to initialize again
      if (userType === "guest" && guestUser) return true;

      // Get or generate fingerprint
      const fp = storedFingerprint || (await getFingerprint());
      dispatch(setFingerprint(fp));

      // ✅ THIS CALL CREATES GUEST IN BACKEND (if not exists)
      const result = await triggerGetCredits().unwrap();

      // Update Redux state with guest data
      if (result.data.guest) {
        dispatch(
          setGuestCredentials({
            guest: result.data.guest,
            fingerprint: fp,
          })
        );
      }

      // Update credits
      if (result.data.credits) {
        dispatch(setCredits(result.data.credits));
      }

      return true;
    } catch (error) {
      console.error("Failed to initialize guest:", error);
      dispatch(setError(extractApiErrorMessage(error)));
      return false;
    }
  }, [userType, guestUser, storedFingerprint, dispatch, triggerGetCredits]);

  // ==================== CHECK CREDITS ====================
  const checkCredits = useCallback(
    (required: number = 1): boolean => {
      if (!credits) return false;
      const remaining = typeof credits.remaining === "number" 
        ? credits.remaining 
        : Number(credits.remaining) || 0;
      return remaining >= required;
    },
    [credits]
  );

  // ==================== VERIFY EMAIL ====================
  const verifyEmail = useCallback(
    async (token: string): Promise<boolean> => {
      try {
        dispatch(clearError());
        const result = await verifyEmailMutation(token).unwrap();
        if (result) {
          dispatch(updateEmailVerificationStatus(true));
        }
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
    async (data: {
      resetPasswordToken: string;
      newPassword: string;
    }): Promise<boolean> => {
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
  const refreshCredits = useCallback(async (): Promise<void> => {
    try {
      await refetchCredits();
    } catch (err) {
      console.log("Failed to refresh credits:", err);
    }
  }, [refetchCredits]);

  // ==================== HELPER FUNCTIONS ====================
  const getDisplayName = useCallback((): string => {
    if (userType === "registered" && registeredUser) {
      return (
        registeredUser.fullName || registeredUser.email.split("@")[0] || "User"
      );
    }
    return "Guest";
  }, [userType, registeredUser]);

  const getCreditsRemaining = useCallback((): number | string => {
    if (!credits) return 0;
    return credits.remaining;
  }, [credits]);

  const hasEnoughCredits = useCallback(
    (required: number = 1): boolean => {
      return checkCredits(required);
    },
    [checkCredits]
  );

  const isEmailVerified = useCallback((): boolean => {
    if (userType !== "registered" || !registeredUser) return false;
    return registeredUser.isEmailVerified;
  }, [userType, registeredUser]);

  const is2FAEnabled = useCallback((): boolean => {
    if (userType !== "registered" || !registeredUser) return false;
    return registeredUser.twoFactorEnabled;
  }, [userType, registeredUser]);

  const isGuest = userType === "guest";
  const isRegistered = userType === "registered";
  const isAnonymous = userType === "anonymous";

  const combinedIsLoading =
    isLoading ||
    isForgotPasswordLoading ||
    isResetPasswordLoading ||
    isVerifyingEmail ||
    isResendingVerifyEmail ||
    isFetchingCredits;

  return {
    // State
    isGuest,
    isRegistered,
    isAnonymous,
    isLoading: combinedIsLoading,
    credits,

    // Email & Password Operations
    verifyEmail,
    resendVerifyEmail,
    forgotPassword,
    resetPassword,

    // ✅ NEW: Guest & Credit Operations
    initializeGuest,
    checkCredits,
    refreshCredits,

    // Helper Functions
    getDisplayName,
    getCreditsRemaining,
    hasEnoughCredits,
    isEmailVerified,
    is2FAEnabled,
  };
};