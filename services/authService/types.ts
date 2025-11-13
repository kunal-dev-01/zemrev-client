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

export interface User {
  googleId?: string;
  authProvider: AuthProvider;
  fullName: string;
  email: string;
  password?: string;
  phoneNumber?: string;
  address?: Address;
  role: UserRole;
  plan: PlanDetails;
  creditsUsed: number;
  lastCreditReset: Date;
  isEmailVerified: boolean;
  passwordChangedAt?: Date;
  twoFactorSecret?: string;
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

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isGoogleLoading: boolean;
  error: string | null;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  fullName: string;
  email: string;
  password: string;
  planType: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  data: {
    user: User;
    accessToken: string;
  };
}

export interface SignupResponse {
  status: string;
  message: string;
  data: {
    user: User;
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

export interface ApiError {
  status: string;
  message: string;
  statusCode?: number;
}

