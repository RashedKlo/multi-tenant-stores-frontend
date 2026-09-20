// features/favorites/api/get-favorite-stores.ts
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import type { Result } from "@/shared/lib/result";
import type { PagedFavoriteStores } from "../types";

export async function getFavoriteStores(
  page = 1,
  pageSize = 20,
): Promise<Result<PagedFavoriteStores>> {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  return fetchJson<PagedFavoriteStores>(`/api/favorites/stores?${params}`, {
    next: {
      revalidate: REVALIDATE.minute * 2,
      tags: [CACHE_TAGS.favoriteStores],
    },
  });
}