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
  const [triggerGetCredits] = useLazyGetCreditStatusQuery();

  // ==================== INITIALIZE GUEST (AUTO ON TOOL USAGE) ====================
  const initializeGuestForTool = useCallback(async (): Promise<boolean> => {
    try {
      if (userType === "registered") return true;
      if (userType === "guest" && guestUser) return true;

      const fp = storedFingerprint || (await getFingerprint());
      dispatch(setFingerprint(fp));

      const result = await triggerGetCredits().unwrap();

      if (result.data.guest) {
        dispatch(
          setGuestCredentials({
            guest: result.data.guest,
            fingerprint: fp,
          })
        );
      }

      return true;
    } catch (error) {
      console.error("Failed to initialize guest:", error);
      return false;
    }
  }, [userType, guestUser, storedFingerprint, dispatch, triggerGetCredits]);

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
  const refreshCredits = useCallback(async () => {
    try {
      await refetchCredits();
    } catch (err) {
      console.log("Failed to refresh credits:", err);
    }
  }, [refetchCredits]);

  // ==================== GET CREDIT STATUS (MANUAL) ====================
  const getCreditStatus = useCallback(async () => {
    try {
      const result = await triggerGetCredits().unwrap();
      return result.data;
    } catch (err) {
      console.log("Failed to get credit status:", err);
      return null;
    }
  }, [triggerGetCredits]);

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
      if (!credits) return false;
      return (
        typeof credits.remaining === "number" && credits.remaining >= required
      );
    },
    [credits]
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
    isResendingVerifyEmail;

  return {
    // State
    isGuest,
    isRegistered,
    isAnonymous,
    isLoading: combinedIsLoading,

    // Email & Password Operations
    verifyEmail,
    resendVerifyEmail,
    forgotPassword,
    resetPassword,

    // Guest & Credits
    refreshCredits,
    getCreditStatus,
    initializeGuestForTool,

    // Helper Functions
    getDisplayName,
    getCreditsRemaining,
    hasEnoughCredits,
    isEmailVerified,
    is2FAEnabled,
  };
};
