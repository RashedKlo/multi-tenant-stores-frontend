// features/auth/actions/reset-password-action.ts
"use server";

import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import {
  resetPasswordSchema,
  type ResetPasswordInput,
} from "../schemas/auth.schema";

export async function resetPasswordAction(
  input: ResetPasswordInput
): Promise<Result<void>> {
  const parsed = resetPasswordSchema.safeParse(input);

  if (!parsed.success) {
    return fail("errors.validation", parsed.error.flatten().fieldErrors);
  }

  return fetchJson<void>("/api/auth/reset-password", {
    method: "POST",
    authToken: null,
    body: {
      email: parsed.data.email,
      code: parsed.data.code,
      newPassword: parsed.data.newPassword,
    },
  });
}