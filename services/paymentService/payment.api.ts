// src/services/paymentService/payment.api.ts

import { baseApi } from '@/lib/baseApi/base.api';
import type {
  CreateCheckoutRequest,
  CreateCheckoutResponse,
  BuyCreditsRequest,
  BuyCreditsResponse,
  VerifyPaymentResponse,
  CancelSubscriptionResponse,
  BillingPortalResponse,
  PaymentHistoryResponse,
} from './types';

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ==================== CREATE CHECKOUT (Subscriptions) ====================
    createCheckout: builder.mutation<CreateCheckoutResponse, CreateCheckoutRequest>({
      query: (data) => ({
        url: '/payment/create-checkout',
        method: 'POST',
        body: data,
      }),
    }),

    // ==================== BUY CREDITS (CUSTOM plan) ====================
    buyCredits: builder.mutation<BuyCreditsResponse, BuyCreditsRequest>({
      query: (data) => ({
        url: '/payment/buy-credits',
        method: 'POST',
        body: data,
      }),
    }),

    // ==================== VERIFY PAYMENT ====================
    verifyPayment: builder.query<VerifyPaymentResponse, string>({
      query: (sessionId) => ({
        url: `/payment/verify?session_id=${sessionId}`,
        method: 'GET',
      }),
    }),

    // ==================== CANCEL SUBSCRIPTION ====================
    cancelSubscription: builder.mutation<CancelSubscriptionResponse, void>({
      query: () => ({
        url: '/payment/cancel-subscription',
        method: 'POST',
      }),
      invalidatesTags: ['User', 'Credits'],
    }),

    // ==================== GET BILLING PORTAL ====================
    getBillingPortal: builder.query<BillingPortalResponse, void>({
      query: () => '/payment/billing-portal',
    }),

    // ==================== GET PAYMENT HISTORY ====================
    getPaymentHistory: builder.query<PaymentHistoryResponse, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/payment/history?page=${page}&limit=${limit}`,
        method: 'GET',
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateCheckoutMutation,
  useBuyCreditsMutation,
  useVerifyPaymentQuery,
  useLazyVerifyPaymentQuery,
  useCancelSubscriptionMutation,
  useGetBillingPortalQuery,
  useLazyGetBillingPortalQuery,
  useGetPaymentHistoryQuery,
  useLazyGetPaymentHistoryQuery,
} = paymentApi;