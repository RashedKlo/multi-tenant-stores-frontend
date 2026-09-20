// features/auth/actions/resend-verification-action.ts
"use server";

import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import {
  resendVerificationSchema,
  type ResendVerificationInput,
} from "../schemas/auth.schema";

export async function resendVerificationAction(
  input: ResendVerificationInput
): Promise<Result<void>> {
  const parsed = resendVerificationSchema.safeParse(input);

  if (!parsed.success) {
    return fail("errors.validation", parsed.error.flatten().fieldErrors);
  }

  return fetchJson<void>("/api/auth/resend-verification", {
    method: "POST",
    authToken: null,
    body: { email: parsed.data.email },
  });
}