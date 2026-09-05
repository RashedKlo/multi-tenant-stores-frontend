// features/auth/actions/google-login-action.ts
"use server";

import { setAuthCookies, clearGuestCookie } from "../../../shared/lib/http/token-storage";
import { toAuthErrorKey } from "../../../shared/lib/http/auth-errors";
import type { ActionResult, AuthTokens, GoogleLoginInput } from "../types";
import { fetchJson } from "@/shared/lib/http/fetch-json";

export async function googleLoginAction(
  input: GoogleLoginInput,
): Promise<ActionResult<AuthTokens>> {
  const idToken = (input.idToken ?? "").trim();
  if (!idToken) {
    return { success: false, error: "errors.generic" };
  }

  try {
    const tokens = await fetchJson<AuthTokens>("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idToken: input.idToken }),
      });
    await setAuthCookies(tokens);
    await clearGuestCookie();
    return { success: true, data: tokens };
  } catch (error) {
    console.error("[googleLoginAction]", error);
    return { success: false, error: toAuthErrorKey(error) };
  }
}
