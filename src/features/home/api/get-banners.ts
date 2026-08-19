// features/home/api/get-banners.ts
import { fetchJson, ApiError } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import type { HomeBanner } from "../types/home.types";

/**
 * GET /api/home/banners
 * Server-only. Returns [] on failure so sections can render their empty state
 * instead of throwing — failures are still logged for observability.
 */
export async function getHomeBanners(): Promise<HomeBanner[]> {
  try {
    return await fetchJson<HomeBanner[]>("/api/home/banners", {
      next: { revalidate: REVALIDATE.hour, tags: [CACHE_TAGS.homeBanners] },
    });
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[getHomeBanners] ${error.message}`);
    } else {
      console.error("[getHomeBanners] Unexpected error:", error);
    }
    return [];
  }
}