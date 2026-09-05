// features/auth/actions/forgot-password-action.ts
"use server";

import { toAuthErrorKey } from "../../../shared/lib/http/auth-errors";
import { isValidEmail, normalizeEmail } from "../lib/validators";
import type { ActionResult, ForgotPasswordInput } from "../types";
import { fetchJson } from "@/shared/lib/http/fetch-json";

export async function forgotPasswordAction(
  input: ForgotPasswordInput,
): Promise<ActionResult> {
  const email = normalizeEmail(input.email ?? "");

  if (!isValidEmail(email)) {
    return { success: false, error: "errors.invalidEmail" };
  }

  try {
    await fetchJson<undefined>("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: input.email }),
      });
    // Always succeed from the client's perspective to avoid email enumeration
    return { success: true, data: undefined };
  } catch (error) {
    console.error("[forgotPasswordAction]", error);
    // Still return success for UX / security (backend should too)
    if (toAuthErrorKey(error) === "errors.rateLimited") {
      return { success: false, error: "errors.rateLimited" };
    }
    return { success: true, data: undefined };
  }
}
