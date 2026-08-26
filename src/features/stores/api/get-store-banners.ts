// features/stores/api/get-store-banners.ts
import { fetchJson, ApiError } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import type { StoreBanner } from "../types";

export async function getStoreBanners(
  storeId: string
): Promise<StoreBanner[]> {
  try {
    const data = await fetchJson<StoreBanner[]>(
      `/api/stores/${storeId}/banners`,
      {
        next: {
          revalidate: REVALIDATE.hour,
          // tags: [CACHE_TAGS.storeBanners(storeId)],
        },
      }
    );
    return Array.isArray(data) ? data : [];
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[getStoreBanners] ${error.message}`);
    }
    return [];
  }
}