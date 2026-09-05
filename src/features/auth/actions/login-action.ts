// features/auth/actions/login-action.ts
"use server";

import { setAuthCookies, getGuestToken, clearGuestCookie } from "../../../shared/lib/http/token-storage";
import { toAuthErrorKey } from "../../../shared/lib/http/auth-errors";
import { isValidEmail, isValidPassword, normalizeEmail } from "../lib/validators";
import type { ActionResult, AuthTokens, LoginInput } from "../types";
import { fetchJson } from "@/shared/lib/http/fetch-json";

export async function loginAction(
  input: LoginInput,
): Promise<ActionResult<AuthTokens>> {
  const email = normalizeEmail(input.email ?? "");
  const password = input.password ?? "";

  if (!isValidEmail(email)) {
    return { success: false, error: "errors.invalidEmail" };
  }
  if (!isValidPassword(password)) {
    return { success: false, error: "errors.invalidPassword" };
  }

  try {
    const guestToken = input.guestToken ?? (await getGuestToken());

    const tokens = await fetchJson<AuthTokens>("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: input.email,
          password: input.password,
          storeId: input.storeId ?? null,
          guestToken: input.guestToken ?? null,
        }),
      });

    await setAuthCookies(tokens);
    if (guestToken) await clearGuestCookie();

    return { success: true, data: tokens };
  } catch (error) {
    console.error("[loginAction]", error);
    return { success: false, error: toAuthErrorKey(error) };
  }
}
