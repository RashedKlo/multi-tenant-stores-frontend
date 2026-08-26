// features/stores/api/get-products-by-section.ts
import { fetchJson, ApiError } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import type { PagedProducts } from "../types";

interface Params {
  sectionId: string;
  inStockOnly?: boolean;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  pageSize?: number;
}

export async function getProductsBySection({
  sectionId,
  inStockOnly,
  minPrice,
  maxPrice,
  page = 1,
  pageSize = 20,
}: Params): Promise<PagedProducts> {
  try {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
    });

    if (inStockOnly !== undefined) {
      params.set("inStockOnly", String(inStockOnly));
    }
    if (minPrice !== undefined) params.set("minPrice", String(minPrice));
    if (maxPrice !== undefined) params.set("maxPrice", String(maxPrice));

    return await fetchJson<PagedProducts>(
      `/api/sections/${sectionId}/products?${params}`,
      {
        next: {
          revalidate: REVALIDATE.minute * 5,
          // tags: [CACHE_TAGS.sectionProducts(sectionId)],
        },
      }
    );
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[getProductsBySection] ${error.message}`);
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