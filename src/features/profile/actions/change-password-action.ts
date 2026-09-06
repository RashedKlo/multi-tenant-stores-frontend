// src/features/profile/actions/change-password-action.ts
"use server";

import { fetchJson } from "@/shared/lib/http/fetch-json";
import { getAccessToken } from "@/shared/lib/http/token-storage";
import { toAuthErrorKey } from "@/shared/lib/http/auth-errors";
import { isValidPassword } from "@/features/auth/lib/validators";
import type { ActionResult } from "@/features/auth/types";
import type { ChangePasswordInput } from "../types/profile.types";

export async function changePasswordAction(
  input: ChangePasswordInput,
): Promise<ActionResult> {
  const currentPassword = input.currentPassword ?? "";
  const newPassword = input.newPassword ?? "";

  if (!currentPassword) {
    return { success: false, error: "errors.invalidPassword" };
  }
  if (!isValidPassword(newPassword)) {
    return { success: false, error: "errors.invalidPassword" };
  }

  try {
    const token = await getAccessToken();
    if (!token) {
      return { success: false, error: "errors.unauthorized" };
    }

    await fetchJson<unknown>("/api/customers/me/password", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    return { success: true, data: undefined };
  } catch (error) {
    console.error("[changePasswordAction]", error);
    return { success: false, error: toAuthErrorKey(error) };
  }
}