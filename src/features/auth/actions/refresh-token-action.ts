// features/auth/actions/refresh-token-action.ts
"use server";

import {
  getRefreshToken,
  setAuthCookies,
  clearAuthCookies,
} from "@/shared/lib/http/token-storage";
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import type { AuthTokens } from "../types";

export async function refreshTokenAction(): Promise<Result<AuthTokens>> {
  const refreshToken = await getRefreshToken();

  if (!refreshToken) {
    return fail("errors.unauthorized");
  }

  const result = await fetchJson<AuthTokens>("/api/auth/refresh", {
    method: "POST",
    authToken: null, // refresh is unauthenticated; only body token matters
    body: { refreshToken },
  });

  if (!result.success) {
    await clearAuthCookies();
    return result;
  }

  await setAuthCookies(result.data);
  return result;
}