// features/stores/api/get-store-detail.ts
import { fetchJson, ApiError } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import type { StoreDetail } from "../types";

export async function getStoreDetail(
  storeId: string
): Promise<StoreDetail | null> {
  try {
    return await fetchJson<StoreDetail>(`/api/stores/${storeId}`, {
      next: {
        revalidate: REVALIDATE.hour,
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