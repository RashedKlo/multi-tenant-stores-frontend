// features/profile/actions/change-password-action.ts
"use server";

import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import {
  changePasswordSchema,
  type ChangePasswordInput,
} from "../schemas/profile.schema";

export async function changePasswordAction(
  input: ChangePasswordInput,
): Promise<Result<void>> {
  const parsed = changePasswordSchema.safeParse(input);

  if (!parsed.success) {
    return fail("errors.validation", parsed.error.flatten().fieldErrors);
  }

  return fetchJson<void>("/api/customers/me/password", {
    method: "PUT",
    body: {
      currentPassword: parsed.data.currentPassword,
      newPassword: parsed.data.newPassword,
    },
  });
}