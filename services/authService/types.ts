export interface User {
  email: string;
  name: string;
  avatar: string | null;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface LoginResponse {
  success: boolean;
  user: User;
  message?: string;
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

export interface MeResponse {
  success: boolean;
  user: User;
}

export interface ApiError {
  success: false;
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}