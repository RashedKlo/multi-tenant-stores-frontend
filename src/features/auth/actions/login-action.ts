// features/auth/actions/login-action.ts
"use server";

import {
  setAuthCookies,
  getGuestToken,
  clearGuestCookie,
} from "@/shared/lib/http/token-storage";
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import type { AuthTokens } from "../types";
import { loginSchema, type LoginInput } from "../schemas/auth.schema";

export async function loginAction(
  input: LoginInput
): Promise<Result<AuthTokens>> {
  const parsed = loginSchema.safeParse(input);

  if (!parsed.success) {
    return fail("errors.validation", parsed.error.flatten().fieldErrors);
  }

  const guestToken =
    parsed.data.guestToken ?? (await getGuestToken()) ?? null;

  const result = await fetchJson<AuthTokens>("/api/auth/login", {
    method: "POST",
    body: {
      email: parsed.data.email,
      password: parsed.data.password,
      storeId: parsed.data.storeId ?? null,
      guestToken,
    },
  });

  if (!result.success) {
    return result;
  }

  await setAuthCookies(result.data);
  if (guestToken) await clearGuestCookie();

  return result;
}