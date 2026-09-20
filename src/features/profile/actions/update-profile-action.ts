// features/profile/actions/update-profile-action.ts
"use server";

import { updateTag } from "next/cache";
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import { CACHE_TAGS } from "@/shared/config/cache";
import type { CustomerProfile } from "../types/profile.types";
import {
  updateProfileSchema,
  type UpdateProfileInput,
} from "../schemas/profile.schema";

export async function updateProfileAction(
  input: UpdateProfileInput,
): Promise<Result<CustomerProfile>> {
  const parsed = updateProfileSchema.safeParse(input);

  if (!parsed.success) {
    return fail("errors.validation", parsed.error.flatten().fieldErrors);
  }

  const result = await fetchJson<CustomerProfile>("/api/customers/me", {
    method: "PUT",
    body: {
      firstName: parsed.data.firstName,
      lastName: parsed.data.lastName,
    },
  });

  if (result.success) {
    updateTag(CACHE_TAGS.profile);
  }

  return result;
}