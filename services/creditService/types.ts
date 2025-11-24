// src/services/creditService/types.ts

import type { UserType, RegisteredUser, GuestUser, CreditInfo } from '../authService/types';

// ==================== RESPONSE TYPES ====================

export interface CreditStatusResponse {
  status: string;
  data: {
    userType: UserType;
    user?: RegisteredUser;
    guest?: GuestUser;
    credits: CreditInfo;
  };
}

// ==================== STATE ====================

export interface CreditState {
  isLoading: boolean;
 error: string | null;
} 