// src/hooks/paymentHooks/payment.hooks.ts

import { useCallback } from 'react';
import { useAppSelector, useAppDispatch } from '../reduxHooks/redux.hooks';
import {
  useBuyCreditsMutation,
  useLazyVerifyPaymentQuery,
  useLazyGetBillingPortalQuery,
  useGetPaymentHistoryQuery,
  useGetTotalSpentQuery,
} from '@/services/paymentService/payment.api';
import { setPaymentError, clearPaymentError } from '@/services/paymentService/payment.slice';
import { extractApiErrorMessage } from '@/utils/errorExtract.utils';

export const usePayment = () => {
  const dispatch = useAppDispatch();

  const { isLoading, error } = useAppSelector((state) => state.payment);

  const [buyCreditsUutation, { isLoading: isBuyingCredits }] = useBuyCreditsMutation();
  const [verifyPaymentTrigger, { isLoading: isVerifyingPayment }] = useLazyVerifyPaymentQuery();
  const [getBillingPortalTrigger, { isLoading: isLoadingBillingPortal }] =
    useLazyGetBillingPortalQuery();

  // ==================== BUY CREDITS ====================
  const buyCredits = useCallback(
    async (credits: number): Promise<{ success: boolean; checkoutUrl?: string; totalPrice?: string }> => {
      try {
        dispatch(clearPaymentError());

        const result = await buyCreditsUutation({ credits }).unwrap();

        if (result.data.checkoutUrl) {
          // Redirect to Stripe Checkout
          window.location.href = result.data.checkoutUrl;
          return {
            success: true,
            checkoutUrl: result.data.checkoutUrl,
            totalPrice: result.data.totalPrice,
          };
        }

        return { success: false };
      } catch (err: unknown) {
        dispatch(setPaymentError(extractApiErrorMessage(err)));
        return { success: false };
      }
    },
    [buyCreditsUutation, dispatch]
  );

  // ==================== VERIFY PAYMENT ====================
  const verifyPayment = useCallback(
    async (sessionId: string): Promise<{ success: boolean; credits?: number; amount?: number }> => {
      try {
        dispatch(clearPaymentError());

        const result = await verifyPaymentTrigger(sessionId).unwrap();

        if (result.data) {
          return {
            success: true,
            credits: result.data.credits,
            amount: result.data.amountTotal,
          };
        }

        return { success: false };
      } catch (err: unknown) {
        dispatch(setPaymentError(extractApiErrorMessage(err)));
        return { success: false };
      }
    },
    [verifyPaymentTrigger, dispatch]
  );

  // ==================== GET BILLING PORTAL ====================
  const openBillingPortal = useCallback(async (): Promise<boolean> => {
    try {
      dispatch(clearPaymentError());

      const result = await getBillingPortalTrigger().unwrap();

      if (result.data.url) {
        window.location.href = result.data.url;
        return true;
      }

      return false;
    } catch (err: unknown) {
      dispatch(setPaymentError(extractApiErrorMessage(err)));
      return false;
    }
  }, [getBillingPortalTrigger, dispatch]);

  // ==================== GET PAYMENT HISTORY ====================
  const usePaymentHistory = (page: number = 1, limit: number = 10) => {
    const { data, isLoading, error } = useGetPaymentHistoryQuery({ page, limit });

    return {
      payments: data?.data.payments || [],
      pagination: data?.data.pagination,
      isLoading,
      error: error ? extractApiErrorMessage(error) : null,
    };
  };

  // ==================== GET TOTAL SPENT ====================
  const useTotalSpent = () => {
    const { data, isLoading, error } = useGetTotalSpentQuery();

    return {
      totalSpent: data?.data.totalSpent || '$0.00',
      isLoading,
      error: error ? extractApiErrorMessage(error) : null,
    };
  };

  // ==================== CLEAR ERROR ====================
  const clearError = useCallback(() => {
    dispatch(clearPaymentError());
  }, [dispatch]);

  const combinedIsLoading = isLoading || isBuyingCredits || isVerifyingPayment || isLoadingBillingPortal;

  return {
    // Operations
    buyCredits,
    verifyPayment,
    openBillingPortal,
    usePaymentHistory,
    useTotalSpent,

    // Status
    isLoading: combinedIsLoading,
    error,
    clearError,
  };
};