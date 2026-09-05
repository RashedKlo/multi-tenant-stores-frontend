// features/auth/actions/logout-action.ts
"use server";

import {
  clearAuthCookies,
  getAccessToken,
  getRefreshToken,
} from "../../../shared/lib/http/token-storage";
import { toAuthErrorKey } from "../../../shared/lib/http/auth-errors";
import type { ActionResult } from "../types";
import { fetchJson } from "@/shared/lib/http/fetch-json";

/**
 * Logout requires a valid access token (backend [Authorize]).
 * We still clear cookies even if the API call fails.
 */
export async function logoutAction(): Promise<ActionResult> {
  try {
    const refreshToken = await getRefreshToken();
    const accessToken = await getAccessToken();

    if (refreshToken && accessToken) {
      await   fetchJson<unknown>("/api/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refreshToken: refreshToken }),
        });
    }
  } catch (error) {
    console.error("[logoutAction]", error);
    // fall through — always clear local session
    void toAuthErrorKey(error);
  }

  await clearAuthCookies();
  return { success: true, data: undefined };
}
