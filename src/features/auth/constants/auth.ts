// features/auth/constants/auth.ts

export const AUTH_COOKIE = {
  accessToken: "access_token",
  refreshToken: "refresh_token",
  guestToken: "guest_token",
} as const;

/** Default redirect after successful auth */
export const AUTH_REDIRECT = {
  afterLogin: "/home",
  afterRegister: "/verify-email",
  afterVerify: "/home",
  afterReset: "/login",
  login: "/login",
  register: "/register",
} as const;

export const VERIFICATION_CODE_LENGTH = 6;
export const MIN_PASSWORD_LENGTH = 8;
