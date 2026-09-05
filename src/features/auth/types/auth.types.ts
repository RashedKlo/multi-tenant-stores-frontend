// features/auth/types/auth.types.ts

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  accessTokenExpiresAt: string; // ISO DateTimeOffset
}

export interface RegisterResult {
  customerId: string;
  email: string;
}

export interface GuestSession {
  guestToken: string;
  expiresAt: string;
}

export type ActionResult<T = undefined> =
  | { success: true; data: T }
  | { success: false; error: string; fieldErrors?: Record<string, string[]> };

export interface LoginInput {
  email: string;
  password: string;
  storeId?: string;
  guestToken?: string;
}

export interface RegisterInput {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface VerifyEmailInput {
  email: string;
  code: string;
}

export interface ResendVerificationInput {
  email: string;
}

export interface ForgotPasswordInput {
  email: string;
}

export interface ResetPasswordInput {
  email: string;
  code: string;
  newPassword: string;
}

export interface GoogleLoginInput {
  idToken: string;
}

export interface RefreshTokenInput {
  refreshToken: string;
}

export interface LogoutInput {
  refreshToken: string;
}
