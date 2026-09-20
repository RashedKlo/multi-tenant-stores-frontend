// features/auth/actions/verify-email-action.ts
"use server";

import { setAuthCookies } from "@/shared/lib/http/token-storage";
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import type { AuthTokens } from "../types";
import {
  verifyEmailSchema,
  type VerifyEmailInput,
} from "../schemas/auth.schema";

export async function verifyEmailAction(
  input: VerifyEmailInput
): Promise<Result<AuthTokens>> {
  const parsed = verifyEmailSchema.safeParse(input);

  if (!parsed.success) {
    return fail("errors.validation", parsed.error.flatten().fieldErrors);
  }

  const result = await fetchJson<AuthTokens>("/api/auth/verify-email", {
    method: "POST",
    authToken: null,
    body: {
      email: parsed.data.email,
      code: parsed.data.code,
    },
  });

  if (!result.success) {
    return result;
  }

  await setAuthCookies(result.data);
  return result;
}