// features/profile/api/get-profile.ts
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS } from "@/shared/config/cache";
import type { Result } from "@/shared/lib/result";
import type { CustomerProfile } from "../types/profile.types";

export async function getProfile(): Promise<Result<CustomerProfile>> {
  return fetchJson<CustomerProfile>("/api/customers/me", {
    cache: "no-store",
    next: {
      tags: [CACHE_TAGS.profile],
    },
  });
}