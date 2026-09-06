// src/features/profile/actions/update-profile-action.ts
"use server";

import { fetchJson } from "@/shared/lib/http/fetch-json";
import { getAccessToken } from "@/shared/lib/http/token-storage";
import { toAuthErrorKey } from "@/shared/lib/http/auth-errors";
import type { ActionResult } from "@/features/auth/types";
import type { CustomerProfile, UpdateProfileInput } from "../types/profile.types";

export async function updateProfileAction(
  input: UpdateProfileInput,
): Promise<ActionResult<CustomerProfile>> {
  const firstName = input.firstName?.trim() ?? "";
  const lastName = input.lastName?.trim() ?? "";

  if (!firstName || !lastName) {
    return { success: false, error: "errors.nameRequired" };
  }

  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: "errors.unauthorized" };
    }

    const data = await fetchJson<CustomerProfile>("/api/customers/me", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ firstName, lastName }),
    });

    return { success: true, data };
  } catch (error) {
    console.error("[updateProfileAction]", error);
    return { success: false, error: toAuthErrorKey(error) };
  }
}