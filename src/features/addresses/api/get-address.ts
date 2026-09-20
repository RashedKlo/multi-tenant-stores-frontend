// features/addresses/api/get-address.ts
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import type { Result } from "@/shared/lib/result";
import type { Address } from "../types";

export async function getAddress(id: string): Promise<Result<Address>> {
  return fetchJson<Address>(`/api/addresses/${id}`, {
    next: {
      revalidate: REVALIDATE.minute * 5,
      tags: [CACHE_TAGS.address(id)],
    },
  });
}