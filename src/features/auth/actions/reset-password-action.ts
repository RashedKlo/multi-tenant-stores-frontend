// features/auth/actions/reset-password-action.ts
"use server";

import { toAuthErrorKey } from "../../../shared/lib/http/auth-errors";
import {
  isValidEmail,
  isValidCode,
  isValidPassword,
  normalizeEmail,
} from "../lib/validators";
import type { ActionResult, ResetPasswordInput } from "../types";
import { fetchJson } from "@/shared/lib/http/fetch-json";

export async function resetPasswordAction(
  input: ResetPasswordInput,
): Promise<ActionResult> {
  const email = normalizeEmail(input.email ?? "");
  const code = (input.code ?? "").trim();
  const newPassword = input.newPassword ?? "";

  if (!isValidEmail(email)) {
    return { success: false, error: "errors.invalidEmail" };
  }
  if (!isValidCode(code)) {
    return { success: false, error: "errors.invalidCode" };
  }
  if (!isValidPassword(newPassword)) {
    return { success: false, error: "errors.invalidPassword" };
  }

  try {
    await fetchJson<unknown>("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: input.email,
          code: input.code,
          newPassword: input.newPassword,
        }),
      });
    return { success: true, data: undefined };
  } catch (error) {
    console.error("[resetPasswordAction]", error);
    return { success: false, error: toAuthErrorKey(error) };
  }
}
