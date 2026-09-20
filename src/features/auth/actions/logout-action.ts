// features/auth/actions/logout-action.ts
"use server";

import {
  clearAuthCookies,
  getAccessToken,
  getRefreshToken,
} from "@/shared/lib/http/token-storage";
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";

export async function logoutAction(): Promise<Result<void>> {
  const refreshToken = await getRefreshToken();
  const accessToken = await getAccessToken();

  if (!refreshToken || !accessToken) {
    return fail("errors.notFound");
   }
    const result = await fetchJson<void>("/api/auth/logout", {
      method: "POST",
      body: { refreshToken },
    });
  await clearAuthCookies();

  return result;
}