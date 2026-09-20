
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
  expiresAt: string;}