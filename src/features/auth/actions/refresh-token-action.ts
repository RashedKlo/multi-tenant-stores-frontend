// features/auth/actions/refresh-token-action.ts
"use server";

import {
  getRefreshToken,
  setAuthCookies,
  clearAuthCookies,
} from "../../../shared/lib/http/token-storage";
import { toAuthErrorKey } from "../../../shared/lib/http/auth-errors";
import type { ActionResult, AuthTokens } from "../types";
import { fetchJson } from "@/shared/lib/http/fetch-json";

export async function refreshTokenAction(): Promise<ActionResult<AuthTokens>> {
  try {
    const refreshToken = await getRefreshToken();
    if (!refreshToken) {
      return { success: false, error: "errors.unauthorized" };
    }

    const tokens = await fetchJson<AuthTokens>("/api/auth/refresh", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken: refreshToken }),
      });
    await setAuthCookies(tokens);
    return { success: true, data: tokens };
  } catch (error) {
    console.error("[refreshTokenAction]", error);
    await clearAuthCookies();
    return { success: false, error: toAuthErrorKey(error) };
  }
}
