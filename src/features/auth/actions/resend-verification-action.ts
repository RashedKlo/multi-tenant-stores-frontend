// features/auth/actions/resend-verification-action.ts
"use server";

import { toAuthErrorKey } from "../../../shared/lib/http/auth-errors";
import { isValidEmail, normalizeEmail } from "../lib/validators";
import type { ActionResult, ResendVerificationInput } from "../types";
import { fetchJson } from "@/shared/lib/http/fetch-json";

export async function resendVerificationAction(
  input: ResendVerificationInput,
): Promise<ActionResult> {
  const email = normalizeEmail(input.email ?? "");

  if (!isValidEmail(email)) {
    return { success: false, error: "errors.invalidEmail" };
  }

  try {
    await fetchJson<unknown>("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: input.email }),
      });
    return { success: true, data: undefined };
  } catch (error) {
    console.error("[resendVerificationAction]", error);
    return { success: false, error: toAuthErrorKey(error) };
  }
}
