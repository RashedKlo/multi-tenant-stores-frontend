// features/addresses/api/get-addresses.ts
import { fetchJson, ApiError } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import type { Address } from "../types";
import { getAccessToken } from "@/shared/lib/http/token-storage";

export async function getAddresses(): Promise<Address[]> {
  try {
    const token=await getAccessToken();
    const data = await fetchJson<Address[]>("/api/addresses", {
      headers:{
        "authorization":`Bearer ${token}`
      },
      next: {
        revalidate: REVALIDATE.minute * 5,
        tags: [CACHE_TAGS.addresses],
      },
    });
    return Array.isArray(data) ? data : [];
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[getAddresses] ${error.status}: ${error.message}`);
    } else {
      console.error("[getAddresses]", error);
    }
    return [];
  }
}

