// features/home/api/get-modules.ts
import { fetchJson, ApiError } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import type { Module } from "../types/home.types";

/**
 * GET /api/modules
 * Server-only. Returns [] on failure so sections can render their empty state.
 */
export async function getModules(): Promise<Module[]> {
  try {
    return await fetchJson<Module[]>("/api/modules", {
      // next: { revalidate: REVALIDATE.hour, tags: [CACHE_TAGS.modules] },
      cache:"no-cache"
    });
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[getModules] ${error.message}`);
    } else {
      console.error("[getModules] Unexpected error:", error);
    }
    return [];
  }
}