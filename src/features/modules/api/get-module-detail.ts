// features/modules/api/get-module-detail.ts
import { fetchJson, ApiError } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import type { ModuleDetail } from "../types";

/**
 * GET /api/modules/{id}
 * Server-only. Returns null on failure so the section can show empty state.
 */
export async function getModuleDetail(
  moduleId: string
): Promise<ModuleDetail | null> {
  try {
    const data = await fetchJson<ModuleDetail>(`/api/modules/${moduleId}`, {
      next: {
        revalidate: REVALIDATE.hour,
        tags: [CACHE_TAGS.moduleDetail(moduleId)],
      },
    });

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[getModuleDetail] ${error.message} (${error.path})`);
    } else {
      console.error("[getModuleDetail] Unexpected error:", error);
    }
    return null;
  }
}