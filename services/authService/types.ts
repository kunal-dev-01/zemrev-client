// src/services/authService/types.ts

export enum UserRole {
  USER = "user"
}

export enum PlanType {
  BASIC = "basic",
  PRO = "pro",
  ELITE = "elite",
  SCALE = "scale",
}

export enum AuthProvider {
  LOCAL = "local",
  GOOGLE = "google",
}

export enum SubscriptionStatus {
  ACTIVE = "active",
  CANCELED = "canceled",
  PAST_DUE = "past_due",
  TRIALING = "trialing",
}

export type PlanPriority = "normal" | "high" | "highest" | "dedicated";
export type UserType = "guest" | "registered" | "anonymous";

export interface PlanDetails {
  type: PlanType;
  dailyCredits: number;
  concurrentJobLimit: number;
  priority: PlanPriority;
  price: number;
  features: string[];
}

export interface Address {
  street?: string;
  city?: string;
  state?: string;
  country?: string;
  zipCode?: string;
}

// ==================== USER TYPES ====================

export interface RegisteredUser {
  _id: string;
  googleId?: string;
  authProvider: AuthProvider;
  fullName: string;
  email: string;
  phoneNumber?: string;
  address?: Address;
  role: UserRole;
  plan: PlanDetails;
  creditsUsed: number;
  lastCreditReset: Date;
  isEmailVerified: boolean;
  twoFactorEnabled: boolean;
  isActive: boolean;
  isBlocked: boolean;
  blockedReason?: string;
  stripeCustomerId?: string;
  subscriptionId?: string;
  subscriptionStatus: SubscriptionStatus;
  billingCycleStart: Date;
  billingCycleEnd: Date;
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
  resetDate?: Date;
  isUnlimited?: boolean;
}

// ==================== AUTH STATE ====================

export interface AuthState {
  // User info
  userType: UserType;
  registeredUser: RegisteredUser | null;
  guestUser: GuestUser | null;
  
  // Auth tokens
  accessToken: string | null;
  fingerprint: string | null;
  
  // Credit info
  credits: CreditInfo | null;
  
  // Status
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// ==================== REQUEST TYPES ====================

export interface SignupRequest {
  fullName: string;
  email: string;
  password: string;
  planType: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface Verify2FARequest {
  tempToken: string;
  totpCode: string;
  superKey?: string;
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
  };
}

export interface VerifyEmailResponse {
  status: string;
  message: string;
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
}

export interface Disable2FAResponse {
  status: string;
  message: string;
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
    plan?: PlanType;
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