// features/auth/actions/create-guest-session-action.ts
"use server";

import {
  setGuestCookie,
  getGuestToken,
} from "@/shared/lib/http/token-storage";
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { ok, type Result } from "@/shared/lib/result";
import type { GuestSession } from "../types";

export async function createGuestSessionAction(): Promise<
  Result<GuestSession>
> {
  const existing = await getGuestToken();
  if (existing) {
    return ok({
      guestToken: existing,
      expiresAt: "",
    });
  }
  const result = await fetchJson<GuestSession>("/api/auth/guest-session", {
    method: "POST",
    authToken: null,
  });

  if (result.success) {
   await setGuestCookie(result.data);
  }

  return result;
}