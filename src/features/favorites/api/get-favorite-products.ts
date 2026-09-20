// features/favorites/api/get-favorite-products.ts
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import type { Result } from "@/shared/lib/result";
import type { PagedFavoriteProducts } from "../types";

export async function getFavoriteProducts(
  page = 1,
  pageSize = 20,
): Promise<Result<PagedFavoriteProducts>> {
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  return fetchJson<PagedFavoriteProducts>(
    `/api/favorites/products?${params}`,
    {
      next: {
        revalidate: REVALIDATE.minute * 2,
        tags: [CACHE_TAGS.favoriteProducts],
      },
    },
  );
}