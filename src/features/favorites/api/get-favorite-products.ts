// features/favorites/api/get-favorite-products.ts
import { fetchJson, ApiError } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import type { PagedFavoriteProducts } from "../types";

export async function getFavoriteProducts(
  page = 1,
  pageSize = 20
): Promise<PagedFavoriteProducts> {
  try {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
    });

    return await fetchJson<PagedFavoriteProducts>(
      `/api/favorites/products?${params}`,
      {
        next: {
          revalidate: REVALIDATE.minute * 2,
          tags: [CACHE_TAGS.favoriteProducts],
        },
      }
    );
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[getFavoriteProducts] ${error.message}`);
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