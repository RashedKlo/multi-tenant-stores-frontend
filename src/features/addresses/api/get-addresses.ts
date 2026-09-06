// features/addresses/api/get-addresses.ts
import { fetchJson, ApiError } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import type { Address } from "../types";
import { getAccessToken } from "@/shared/lib/http/token-storage";

export async function getAddresses(): Promise<Address[]> {
  const token = getAccessToken(); // Implement this function to retrieve the access token from your auth system
  try {
    const data = await fetchJson<Address[]>("/api/addresses", {
      headers: {"Authorization": `Bearer ${token}`},
      next: {
        revalidate: REVALIDATE.minute * 5,
        tags: [CACHE_TAGS.addresses],
      },
    });
    return Array.isArray(data) ? data : [];
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[getAddresses] ${error.message}`);
    }
    return [];
  }
}