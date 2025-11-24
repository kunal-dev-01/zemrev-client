// src/services/paymentService/payment.slice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { PaymentState } from './types';
import { paymentApi } from './payment.api';
import { extractErrorMessage } from '@/utils/errorExtract.utils';

const initialState: PaymentState = {
  isLoading: false,
  error: null,
};

const paymentSlice = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    setPaymentError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearPaymentError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // ==================== BUY CREDITS ====================
    builder
      .addMatcher(paymentApi.endpoints.buyCredits.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(paymentApi.endpoints.buyCredits.matchFulfilled, (state) => {
        state.isLoading = false;
      })
      .addMatcher(paymentApi.endpoints.buyCredits.matchRejected, (state, action) => {
        state.isLoading = false;
        state.error = extractErrorMessage(action.payload);
      });
  },
});

export const { setPaymentError, clearPaymentError } = paymentSlice.actions;

export default paymentSlice.reducer;