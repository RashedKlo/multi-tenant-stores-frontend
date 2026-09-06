// features/addresses/api/get-address.ts
import { fetchJson, ApiError } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import type { Address } from "../types";

export async function getAddress(id: string): Promise<Address | null> {
  try {
    return await fetchJson<Address>(`/api/addresses/${id}`, {
      next: {
        revalidate: REVALIDATE.minute * 5,
        tags: [CACHE_TAGS.addresses, `address-${id}`],
      },
    });
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[getAddress] ${error.status}: ${error.message}`);
    } else {
      console.error("[getAddress]", error);
    }
    return null;
  }
}