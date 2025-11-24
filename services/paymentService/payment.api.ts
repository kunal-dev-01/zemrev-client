// src/services/paymentService/payment.api.ts

import { baseApi } from '@/lib/baseApi/base.api';
import type {
  BuyCreditsRequest,
  BuyCreditsResponse,
  VerifyPaymentResponse,
  BillingPortalResponse,
  PaymentHistoryResponse,
  TotalSpentResponse,
} from './types';

export const paymentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ==================== BUY CREDITS ====================
    buyCredits: builder.mutation<BuyCreditsResponse, BuyCreditsRequest>({
      query: (data) => ({
        url: '/payment/buy-credits',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Credits'],
    }),

    // ==================== VERIFY PAYMENT ====================
    verifyPayment: builder.query<VerifyPaymentResponse, string>({
      query: (sessionId) => ({
        url: `/payment/verify?session_id=${sessionId}`,
        method: 'GET',
      }),
      providesTags: ['Credits'],
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

    // ==================== GET TOTAL SPENT ====================
    getTotalSpent: builder.query<TotalSpentResponse, void>({
      query: () => '/payment/total-spent',
    }),
  }),
  overrideExisting: false,
});

export const {
  useBuyCreditsMutation,
  useVerifyPaymentQuery,
  useLazyVerifyPaymentQuery,
  useGetBillingPortalQuery,
  useLazyGetBillingPortalQuery,
  useGetPaymentHistoryQuery,
  useLazyGetPaymentHistoryQuery,
  useGetTotalSpentQuery,
  useLazyGetTotalSpentQuery,
} = paymentApi;