// src/services/creditService/credit.slice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CreditState } from './types';
import { creditApi } from './credit.api';
import { extractErrorMessage } from '@/utils/errorExtract.utils';

const initialState: CreditState = {
  isLoading: false,
  error: null,
};

const creditSlice = createSlice({
  name: 'credit',
  initialState,
  reducers: {
    setCreditError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearCreditError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // ==================== GET CREDIT STATUS ====================
    builder
      .addMatcher(creditApi.endpoints.getCreditStatus.matchPending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addMatcher(creditApi.endpoints.getCreditStatus.matchFulfilled, (state) => {
        state.isLoading = false;
      })
      .addMatcher(creditApi.endpoints.getCreditStatus.matchRejected, (state, action) => {
        state.isLoading = false;
        state.error = extractErrorMessage(action.payload);
      });
  },
});

export const { setCreditError, clearCreditError } = creditSlice.actions;

export default creditSlice.reducer;