// src/hooks/twoFactorHooks/twoFactor.hooks.ts

import { useCallback } from 'react';
import { useAppDispatch } from '../reduxHooks/redux.hooks';
import {
  useSetup2FAMutation,
  useEnable2FAMutation,
  useDisable2FAMutation,
  useGet2FAStatusQuery,
  useLazyGet2FAStatusQuery,
  useRegenerateBackupCodesMutation,
} from '@/services/authService/auth.api';
import { setError, clearError, update2FAStatus } from '@/services/authService/auth.slice';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import type { SerializedError } from '@reduxjs/toolkit';

// Extract error message
const extractApiErrorMessage = (
  error: FetchBaseQueryError | SerializedError | unknown
): string => {
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

export const useTwoFactor = () => {
  const dispatch = useAppDispatch();

  // RTK Query mutations and queries
  const [setup2FAMutation, { isLoading: isSettingUp }] = useSetup2FAMutation();
  const [enable2FAMutation, { isLoading: isEnabling }] = useEnable2FAMutation();
  const [disable2FAMutation, { isLoading: isDisabling }] = useDisable2FAMutation();
  const [regenerateBackupCodesMutation, { isLoading: isRegenerating }] =
    useRegenerateBackupCodesMutation();

  const { data: statusData, isLoading: isLoadingStatus } = useGet2FAStatusQuery();
  const [triggerGet2FAStatus] = useLazyGet2FAStatusQuery();

  // ==================== SETUP 2FA ====================
  const setup2FA = useCallback(async (): Promise<{
    success: boolean;
    data?: {
      secret: string;
      qrCode: string;
      manualEntryKey: string;
      backupCodes: string[];
    };
  }> => {
    try {
      dispatch(clearError());
      const result = await setup2FAMutation().unwrap();
      return {
        success: true,
        data: result.data,
      };
    } catch (err: unknown) {
      const errorMessage = extractApiErrorMessage(err);
      dispatch(setError(errorMessage));
      return { success: false };
    }
  }, [setup2FAMutation, dispatch]);

  // ==================== ENABLE 2FA ====================
  const enable2FA = useCallback(
    async (totpCode: string): Promise<boolean> => {
      try {
        dispatch(clearError());
        const result = await enable2FAMutation({ totpCode }).unwrap();
        if(result) {
          dispatch(update2FAStatus(result.data.twoFactorEnabled));
        }
        return true;
      } catch (err: unknown) {
        dispatch(setError(extractApiErrorMessage(err)));
        return false;
      }
    },
    [enable2FAMutation, dispatch]
  );

  // ==================== DISABLE 2FA ====================
  const disable2FA = useCallback(
    async (password: string, totpCode?: string): Promise<boolean> => {
      try {
        dispatch(clearError());
        const result = await disable2FAMutation({ password, totpCode }).unwrap();
        if(result) {
          dispatch(update2FAStatus(result.data.twoFactorEnabled));
        }
        return true;
      } catch (err: unknown) {
        dispatch(setError(extractApiErrorMessage(err)));
        return false;
      }
    },
    [disable2FAMutation, dispatch]
  );

  // ==================== REGENERATE BACKUP CODES ====================
  const regenerateBackupCodes = useCallback(
    async (password: string): Promise<{ success: boolean; backupCodes?: string[] }> => {
      try {
        dispatch(clearError());
        const result = await regenerateBackupCodesMutation({ password }).unwrap();
        return {
          success: true,
          backupCodes: result.data.backupCodes,
        };
      } catch (err: unknown) {
        dispatch(setError(extractApiErrorMessage(err)));
        return { success: false };
      }
    },
    [regenerateBackupCodesMutation, dispatch]
  );

  // ==================== GET 2FA STATUS ====================
  const refresh2FAStatus = useCallback(async () => {
    try {
      await triggerGet2FAStatus().unwrap();
    } catch (err) {
      console.log('Failed to refresh 2FA status:', err);
    }
  }, [triggerGet2FAStatus]);

  // Combined loading state
  const isLoading = isSettingUp || isEnabling || isDisabling || isRegenerating || isLoadingStatus;

  return {
    // Operations
    setup2FA,
    enable2FA,
    disable2FA,
    regenerateBackupCodes,
    refresh2FAStatus,

    // Status
    isLoading,
    is2FAEnabled: statusData?.data?.enabled ?? false,
    backupCodesRemaining: statusData?.data?.backupCodesRemaining ?? 0,
  };
};