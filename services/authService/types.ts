// src/services/authService/types.ts

export enum UserRole {
  USER = "user",
}

export enum AuthProvider {
  LOCAL = "local",
  GOOGLE = "google",
}

export type UserType = "guest" | "registered" | "anonymous";
export type UserStatus = "inactive" | "active";

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
}

// ==================== USER TYPES ====================

export interface RegisteredUser {
  authProvider: AuthProvider;
  fullName: string;
  email: string;
  password?: string;
  address?: Address;
  role: UserRole;
  credits: number;
  status: UserStatus;
  stripeCustomerId?: string;
  isEmailVerified: boolean;
  passwordChangedAt?: Date;
  twoFactorEnabled: boolean;
  isActive: boolean;
  isBlocked: boolean;
  blockedReason?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GuestUser {
  _id: string;
  fingerprint: string;
  ipAddress: string;
  creditsUsed: number;
  lastResetDate: Date;
}

export interface CreditInfo {
  total: number | string;
  used: number;
  remaining: number | string;
  resetDate?: Date; // For guests
}

// ==================== AUTH STATE ====================

export interface AuthState {
  userType: UserType;
  registeredUser: RegisteredUser | null;
  guestUser: GuestUser | null;

  accessToken: string | null;
  fingerprint: string | null;

  credits: CreditInfo | null;

  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// ==================== REQUEST TYPES ====================

export interface SignupRequest {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface Verify2FARequest {
  tempToken: string;
  totpCode: string;
  isBackupCode?: boolean;
}

export interface Enable2FARequest {
  totpCode: string;
}

export interface Disable2FARequest {
  password: string;
  totpCode?: string;
}

export interface RegenerateBackupCodesRequest {
  password: string;
}

export interface ForgotRequest {
  email: string;
}

export interface ResetPasswordRequest {
  resetPasswordToken: string;
  newPassword: string;
}

// ==================== RESPONSE TYPES ====================

export interface SignupResponse {
  status: string;
  message: string;
  data: {
    user: RegisteredUser;
    accessToken: string;
    requiresPayment?: boolean;
    checkoutUrl?: string;
    creditInfo?: {
      total: number;
      used: number;
      remaining: number;
    };
  };
}

export interface VerifyEmailResponse {
  status: string;
  message: string;
  data: {
    isEmailVerified: boolean;
  };
}

export interface LoginResponse {
  status: string;
  message: string;
  data: {
    user?: RegisteredUser;
    accessToken?: string;
    requires2FA?: boolean;
    tempToken?: string;
  };
}

export interface Verify2FAResponse {
  status: string;
  message: string;
  data: {
    user: RegisteredUser;
    accessToken: string;
  };
}

export interface RefreshTokenResponse {
  status: string;
  data: {
    accessToken: string;
  };
}

export interface LogoutResponse {
  status: string;
  message: string;
}

export interface Setup2FAResponse {
  status: string;
  message: string;
  data: {
    secret: string;
    qrCode: string;
    manualEntryKey: string;
    backupCodes: string[];
  };
}

export interface Enable2FAResponse {
  status: string;
  message: string;
  data: {
    twoFactorEnabled: boolean;
  };
}

export interface Disable2FAResponse {
  status: string;
  message: string;
  data: {
    twoFactorEnabled: boolean;
  };
}

export interface Get2FAStatusResponse {
  status: string;
  data: {
    enabled: boolean;
    backupCodesRemaining: number;
  };
}

export interface RegenerateBackupCodesResponse {
  status: string;
  message: string;
  data: {
    backupCodes: string[];
  };
}

export interface ForgotResponse {
  status: string;
  message: string;
}

export interface ResetPasswordResponse {
  status: string;
  message: string;
}

export interface CreditStatusResponse {
  status: string;
  data: {
    userType: UserType;
    user?: RegisteredUser;
    guest?: GuestUser;
    credits: CreditInfo;
  };
}

// ==================== ERROR TYPES ====================

export interface ApiError {
  status: string;
  message: string;
  error?: string;
  statusCode?: number;
}