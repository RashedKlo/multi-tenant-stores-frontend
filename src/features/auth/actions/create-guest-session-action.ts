// features/auth/actions/create-guest-session-action.ts
"use server";

import { setGuestCookie } from "../../../shared/lib/http/token-storage";
import { toAuthErrorKey } from "../../../shared/lib/http/auth-errors";
import type { ActionResult, GuestSession } from "../types";
import { fetchJson } from "@/shared/lib/http/fetch-json";

export async function createGuestSessionAction(): Promise<
  ActionResult<GuestSession>
> {
  try {
    const session = await fetchJson<GuestSession>("/api/auth/guest-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
    await setGuestCookie(session);
    return { success: true, data: session };
  } catch (error) {
    console.error("[createGuestSessionAction]", error);
    return { success: false, error: toAuthErrorKey(error) };
  }
}
