// features/auth/actions/forgot-password-action.ts
"use server";

import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail,  type Result } from "@/shared/lib/result";
import {
  forgotPasswordSchema,
  type ForgotPasswordInput,
} from "../schemas/auth.schema";

export async function forgotPasswordAction(
  input: ForgotPasswordInput
): Promise<Result<void>> {
  const parsed = forgotPasswordSchema.safeParse(input);

  if (!parsed.success) {
    return fail("errors.validation", parsed.error.flatten().fieldErrors);
  }

  const result = await fetchJson<void>("/api/auth/forgot-password", {
    method: "POST",
    authToken: null,
    body: { email: parsed.data.email },
  });
  return result;
}