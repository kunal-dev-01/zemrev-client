// src/services/creditService/credit.api.ts

import { baseApi } from '@/lib/baseApi/base.api';
import type {
  CreditStatusResponse,
} from './types';

export const creditApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ==================== GET CREDIT STATUS ====================
    getCreditStatus: builder.query<CreditStatusResponse, void>({
      query: () => ({
        url: `/credit/status`,
        method: 'GET',
      }),
      providesTags: ['Credits'],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCreditStatusQuery,
  useLazyGetCreditStatusQuery,
} = creditApi;