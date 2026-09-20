// features/auth/actions/google-login-action.ts
"use server";

import {
  setAuthCookies,
  clearGuestCookie,
} from "@/shared/lib/http/token-storage";
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import type { AuthTokens } from "../types";
import {
  googleLoginSchema,
  type GoogleLoginInput,
} from "../schemas/auth.schema";

export async function googleLoginAction(
  input: GoogleLoginInput
): Promise<Result<AuthTokens>> {
  const parsed = googleLoginSchema.safeParse(input);

  if (!parsed.success) {
    return fail("errors.validation", parsed.error.flatten().fieldErrors);
  }

  const result = await fetchJson<AuthTokens>("/api/auth/google", {
    method: "POST",
    authToken: null,
    body: { idToken: parsed.data.idToken },
  });

  if (!result.success) {
    return result;
  }

  await setAuthCookies(result.data);
  await clearGuestCookie();

  return result;
}