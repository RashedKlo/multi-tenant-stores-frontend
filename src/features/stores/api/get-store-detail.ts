// features/stores/api/get-store-detail.ts
import { fetchJson, ApiError } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import type { StoreDetail } from "../types";
import { getAccessToken } from "@/shared/lib/http/token-storage";

export async function getStoreDetail(
  storeId: string
): Promise<StoreDetail | null> {
  try {
    const token = await getAccessToken();
    return await fetchJson<StoreDetail>(`/api/stores/${storeId}`, {
      headers: {  
        Authorization: `Bearer ${token}`,
        // Authorization: `Bearer ${process.env.NEXT_PUBLIC_FAVORITES_API_KEY}`,
      },
      next: {
        // revalidate: REVALIDATE.hour,
        // tags: [CACHE_TAGS.storeDetail(storeId)],
      },
    });
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[getStoreDetail] ${error.message} (${error.path})`);
    } else {
      console.error("[getStoreDetail] Unexpected error:", error);
    }
    return null;
  }
}