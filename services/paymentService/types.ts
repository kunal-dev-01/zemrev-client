// src/services/paymentService/types.ts

// ==================== REQUEST TYPES ====================

export interface BuyCreditsRequest {
  credits: number;
}

// ==================== RESPONSE TYPES ====================

export interface BuyCreditsResponse {
  status: string;
  data: {
    checkoutUrl: string;
    credits: number;
    pricePerCredit: number;
    totalPrice: string;
  };
}

export interface VerifyPaymentResponse {
  status: string;
  message: string;
  data: {
    credits: number;
    amountTotal: number;
    paymentStatus: string;
  };
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
  credits: number;
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

export interface TotalSpentResponse {
  status: string;
  data: {
    totalSpent: string;
  };
}

// ==================== STATE ====================

export interface PaymentState {
  isLoading: boolean;
  error: string | null;
}