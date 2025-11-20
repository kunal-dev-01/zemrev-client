// src/hooks/paymentHooks/payment.hooks.ts

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '../reduxHooks/redux.hooks';
import {
  useCreateCheckoutMutation,
  useBuyCreditsMutation,
  useLazyVerifyPaymentQuery,
  useCancelSubscriptionMutation,
  useLazyGetBillingPortalQuery,
  useGetPaymentHistoryQuery,
} from '@/services/paymentService/payment.api';
import { setPaymentError, clearPaymentError } from '@/services/paymentService/payment.slice';
import type { PlanType } from '@/services/authService/types';
import { extractApiErrorMessage } from '@/utils/errorExtract.utils';

export const usePayment = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { isLoading, error } = useAppSelector((state) => state.payment);

  const [createCheckoutMutation, { isLoading: isCreatingCheckout }] = useCreateCheckoutMutation();
  const [buyCreditsUutation, { isLoading: isBuyingCredits }] = useBuyCreditsMutation();
  const [verifyPaymentTrigger, { isLoading: isVerifyingPayment }] = useLazyVerifyPaymentQuery();
  const [cancelSubscriptionMutation, { isLoading: isCancelingSubscription }] =
    useCancelSubscriptionMutation();
  const [getBillingPortalTrigger, { isLoading: isLoadingBillingPortal }] =
    useLazyGetBillingPortalQuery();

  // ==================== CREATE CHECKOUT (Subscriptions: BASIC, PRO, ELITE) ====================
  const createCheckout = useCallback(
    async (planType: PlanType): Promise<{ success: boolean; checkoutUrl?: string }> => {
      try {
        dispatch(clearPaymentError());

        // Validate plan type
        if (planType === 'custom') {
          dispatch(setPaymentError('Use buyCredits() for CUSTOM plan'));
          return { success: false };
        }

        const result = await createCheckoutMutation({ planType }).unwrap();

        if (result.data.checkoutUrl) {
          // Redirect to Stripe Checkout
          window.location.href = result.data.checkoutUrl;
          return { success: true, checkoutUrl: result.data.checkoutUrl };
        }

        return { success: false };
      } catch (err: unknown) {
        dispatch(setPaymentError(extractApiErrorMessage(err)));
        return { success: false };
      }
    },
    [createCheckoutMutation, dispatch]
  );

  // ==================== BUY CREDITS (CUSTOM plan) ====================
  const buyCredits = useCallback(
    async (credits: number): Promise<{ success: boolean; checkoutUrl?: string; price?: string }> => {
      try {
        dispatch(clearPaymentError());

        // Validate minimum
        if (credits < 1000) {
          dispatch(setPaymentError('Minimum 1000 credits required'));
          return { success: false };
        }

        const result = await buyCreditsUutation({ credits }).unwrap();

        if (result.data.checkoutUrl) {
          // Redirect to Stripe Checkout
          window.location.href = result.data.checkoutUrl;
          return {
            success: true,
            checkoutUrl: result.data.checkoutUrl,
            price: result.data.price,
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
    async (sessionId: string): Promise<{ success: boolean; planType?: string; amount?: number }> => {
      try {
        dispatch(clearPaymentError());

        const result = await verifyPaymentTrigger(sessionId).unwrap();

        if (result.data) {
          return {
            success: true,
            planType: result.data.planType,
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

  // ==================== CANCEL SUBSCRIPTION ====================
  const cancelSubscription = useCallback(async (): Promise<boolean> => {
    try {
      dispatch(clearPaymentError());

      await cancelSubscriptionMutation().unwrap();

      // Refresh page to update user state
      router.refresh();
      return true;
    } catch (err: unknown) {
      dispatch(setPaymentError(extractApiErrorMessage(err)));
      return false;
    }
  }, [cancelSubscriptionMutation, dispatch, router]);

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

  // ==================== CLEAR ERROR ====================
  const clearError = useCallback(() => {
    dispatch(clearPaymentError());
  }, [dispatch]);

  const combinedIsLoading =
    isLoading ||
    isCreatingCheckout ||
    isBuyingCredits ||
    isVerifyingPayment ||
    isCancelingSubscription ||
    isLoadingBillingPortal;

  return {
    // Operations
    createCheckout,
    buyCredits,
    verifyPayment,
    cancelSubscription,
    openBillingPortal,
    usePaymentHistory,

    // Status
    isLoading: combinedIsLoading,
    error,
    clearError,
  };
};