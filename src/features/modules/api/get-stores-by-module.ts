// features/modules/api/get-stores-by-module.ts
import { fetchJson, ApiError } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import type { PagedStores } from "../types";
import { getAccessToken } from "@/shared/lib/http/token-storage";

interface GetStoresParams {
  moduleId: string;
  categoryId?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}

/**
 * GET /api/modules/{id}/stores
 * Server-only. Supports category filter + search + pagination.
 */
export async function getStoresByModule({
  moduleId,
  categoryId,
  search,
  page = 1,
  pageSize = 20,
}: GetStoresParams): Promise<PagedStores> {
  try {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
    });

    if (categoryId) params.set("categoryId", categoryId);
    if (search) params.set("search", search);
const token = await getAccessToken();
    const data = await fetchJson<PagedStores>(
      `/api/modules/${moduleId}/stores?${params.toString()}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        // next: {
        //   revalidate: REVALIDATE.minute * 5,
        //   tags: [CACHE_TAGS.moduleStores(moduleId)],
        // },
      }
    );

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[getStoresByModule] ${error.message} (${error.path})`);
    } else {
      console.error("[getStoresByModule] Unexpected error:", error);
    }

    // Safe empty fallback
    return {
      items: [],
      page,
      pageSize,
      totalCount: 0,
      hasNextPage: false,
    };
  }
}