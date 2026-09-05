// features/auth/actions/register-action.ts
"use server";

import { toAuthErrorKey } from "../../../shared/lib/http/auth-errors";
import {
  isValidEmail,
  isValidPassword,
  normalizeEmail,
} from "../lib/validators";
import type { ActionResult, RegisterInput, RegisterResult } from "../types";
import { fetchJson } from "@/shared/lib/http/fetch-json";

export async function registerAction(
  input: RegisterInput,
): Promise<ActionResult<RegisterResult>> {
  const firstName = (input.firstName ?? "").trim();
  const lastName = (input.lastName ?? "").trim();
  const email = normalizeEmail(input.email ?? "");
  const password = input.password ?? "";

  if (!firstName || !lastName) {
    return { success: false, error: "errors.nameRequired" };
  }
  if (!isValidEmail(email)) {
    return { success: false, error: "errors.invalidEmail" };
  }
  if (!isValidPassword(password)) {
    return { success: false, error: "errors.invalidPassword" };
  }

  try {
    const data = await fetchJson<RegisterResult>("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          password: input.password,
        }),
      });
    return { success: true, data };
  } catch (error) {
    console.error("[registerAction]", error);
    return { success: false, error: toAuthErrorKey(error) };
  }
}
