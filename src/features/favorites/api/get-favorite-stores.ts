// features/favorites/api/get-favorite-stores.ts
import { fetchJson, ApiError } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import type { PagedFavoriteStores } from "../types";
import { getAccessToken } from "@/shared/lib/http/token-storage";

export async function getFavoriteStores(
  page = 1,
  pageSize = 20
): Promise<PagedFavoriteStores> {
  try {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
    });
    const token = await getAccessToken();

    return await fetchJson<PagedFavoriteStores>(
      `/api/favorites/stores?${params}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        next: {
          // revalidate: REVALIDATE.minute * 2,
          // tags: [CACHE_TAGS.favoriteStores],
        },
      }
    );
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[getFavoriteStores] ${error.message}`);
    }
    return {
      items: [],
      page,
      pageSize,
      totalCount: 0,
      hasNextPage: false,
    };
  }
}