// src/services/paymentService/types.ts

import { PlanType } from '../authService/types';

// ==================== REQUEST TYPES ====================

export interface CreateCheckoutRequest {
  planType: PlanType;  // BASIC, PRO, ELITE only
}

export interface BuyCreditsRequest {
  credits: number;  // Minimum 1000
}

// ==================== RESPONSE TYPES ====================

export interface CreateCheckoutResponse {
  status: string;
  data: {
    checkoutUrl: string;
  };
}

export interface BuyCreditsResponse {
  status: string;
  data: {
    checkoutUrl: string;
    credits: number;
    price: string; 
  };
}

export interface VerifyPaymentResponse {
  status: string;
  message: string;
  data: {
    planType: string;
    amountTotal: number;
  };
}

export interface CancelSubscriptionResponse {
  status: string;
  message: string;
}

export interface BillingPortalResponse {
  status: string;
  data: {
    url: string;
  };
}

export interface Payment {
  _id: string;
  userId: string;
  stripePaymentId: string;
  stripeInvoiceId?: string;
  amount: number;
  currency: string;
  planType: PlanType;
  paymentStatus: string;
  paymentMethod: string;
  paidAt: Date;
  createdAt: Date;
}

export interface PaymentHistoryResponse {
  status: string;
  data: {
    payments: Payment[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

// ==================== STATE ====================

export interface PaymentState {
  isLoading: boolean;
  error: string | null;
}