// src/hooks/creditHooks/credit.hooks.ts

import { useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../reduxHooks/redux.hooks';
import {
  useGetCreditStatusQuery,
  useLazyGetCreditStatusQuery
} from '@/services/creditService/credit.api';
import { setCreditError, clearCreditError } from '@/services/creditService/credit.slice';
import { extractApiErrorMessage } from '@/utils/errorExtract.utils';

export const useCredit = () => {
  const dispatch = useAppDispatch();

  const { isLoading, error } = useAppSelector((state) => state.credit);

  const { data: creditData, isLoading: isCreditLoading, refetch } = useGetCreditStatusQuery();
  const [triggerGetCredits] = useLazyGetCreditStatusQuery();

  // ==================== GET CREDIT STATUS ====================
  const getCredits = useCallback(async () => {
    try {
      dispatch(clearCreditError());
      await triggerGetCredits().unwrap();
      return true;
    } catch (err: unknown) {
      dispatch(setCreditError(extractApiErrorMessage(err)));
      return false;
    }
  }, [triggerGetCredits, dispatch]);

  // ==================== REFRESH CREDITS ====================
  const refreshCredits = useCallback(async () => {
    try {
      await refetch();
    } catch (err) {
      console.log('Failed to refresh credits:', err);
    }
  }, [refetch]);

  // ==================== HELPER FUNCTIONS ====================
  const getCreditsRemaining = useCallback((): number | string => {
    if (!creditData?.data.credits) return 0;
    return creditData.data.credits.remaining;
  }, [creditData]);

  const hasEnoughCredits = useCallback(
    (required: number = 1): boolean => {
      if (!creditData?.data.credits) return false;
      const remaining = creditData.data.credits.remaining;
      return typeof remaining === 'number' && remaining >= required;
    },
    [creditData]
  );

  const clearError = useCallback(() => {
    dispatch(clearCreditError());
  }, [dispatch]);

  const combinedIsLoading = isLoading || isCreditLoading;

  return {
    // Data
    creditInfo: creditData?.data,
    userType: creditData?.data.userType,
    credits: creditData?.data.credits,

    // Operations
    getCredits,
    refreshCredits,

    // Helpers
    getCreditsRemaining,
    hasEnoughCredits,

    // Status
    isLoading: combinedIsLoading,
    error,
    clearError,
  };
};