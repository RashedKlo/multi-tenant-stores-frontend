// features/auth/actions/verify-email-action.ts
"use server";

import { setAuthCookies } from "../../../shared/lib/http/token-storage";
import { toAuthErrorKey } from "../../../shared/lib/http/auth-errors";
import { isValidEmail, isValidCode, normalizeEmail } from "../lib/validators";
import type { ActionResult, AuthTokens, VerifyEmailInput } from "../types";
import { fetchJson } from "@/shared/lib/http/fetch-json";

export async function verifyEmailAction(
  input: VerifyEmailInput,
): Promise<ActionResult<AuthTokens>> {
  const email = normalizeEmail(input.email ?? "");
  const code = (input.code ?? "").trim();

  if (!isValidEmail(email)) {
    return { success: false, error: "errors.invalidEmail" };
  }
  if (!isValidCode(code)) {
    return { success: false, error: "errors.invalidCode" };
  }

  try {
    const tokens = await fetchJson<AuthTokens>("/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: input.email,
          code: input.code,
        }),
      });
    await setAuthCookies(tokens);
    return { success: true, data: tokens };
  } catch (error) {
    console.error("[verifyEmailAction]", error);
    return { success: false, error: toAuthErrorKey(error) };
  }
}
