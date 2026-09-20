// features/addresses/api/get-addresses.ts
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import type { Result } from "@/shared/lib/result";
import type { Address } from "../types/addresses.types";

export async function getAddresses(): Promise<Result<Address[]>> {
  return fetchJson<Address[]>("/api/addresses", {
    next: {
      revalidate: REVALIDATE.minute * 5,
      tags: [CACHE_TAGS.addresses],
    },
  });
}