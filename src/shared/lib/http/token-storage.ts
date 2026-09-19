// features/auth/lib/token-storage.ts
"use server";

import { cookies } from "next/headers";
import { AUTH_COOKIE } from "../../../features/auth/constants/auth";
import type { AuthTokens, GuestSession } from "../../../features/auth/types";

const isProd = process.env.NODE_ENV === "production";

const baseCookie = {
  httpOnly: true,
  secure: isProd,
  sameSite: "lax" as const,
  path: "/",
};

/**
 * Persist auth tokens in httpOnly cookies (server-only).
 * Access token is shorter-lived; refresh token lasts longer.
 */
export async function setAuthCookies(tokens: AuthTokens) {
  const store = await cookies();
  const expiresAt = new Date(tokens.accessTokenExpiresAt);

  store.set(AUTH_COOKIE.accessToken, tokens.accessToken, {
    ...baseCookie,
    expires: expiresAt,
  });

  // Refresh token: 30 days fallback if backend doesn't dictate cookie TTL
  const refreshExpires = new Date();
  refreshExpires.setDate(refreshExpires.getDate() + 30);

  store.set(AUTH_COOKIE.refreshToken, tokens.refreshToken, {
    ...baseCookie,
    expires: refreshExpires,
  });
}

export async function clearAuthCookies() {
  const store = await cookies();
  store.delete(AUTH_COOKIE.accessToken);
  store.delete(AUTH_COOKIE.refreshToken);
}

export async function getAccessToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(AUTH_COOKIE.accessToken)?.value??"";
}

export async function getRefreshToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(AUTH_COOKIE.refreshToken)?.value;
}

export async function setGuestCookie(session: GuestSession) {
  const store = await cookies();
  store.set(AUTH_COOKIE.guestToken, session.guestToken, {
    ...baseCookie,
    expires: new Date(session.expiresAt),
  });
}

export async function getGuestToken(): Promise<string | undefined> {
  const store = await cookies();
  return store.get(AUTH_COOKIE.guestToken)?.value;
}

export async function clearGuestCookie() {
  const store = await cookies();
  store.delete(AUTH_COOKIE.guestToken);
}
