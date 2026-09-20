// features/stores/api/get-products-by-section.ts
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import type { PagedProducts } from "../types";
import {
  getProductsBySectionSchema,
  type GetProductsBySectionInput,
} from "../schemas/stores.schema";

export async function getProductsBySection(
  input: GetProductsBySectionInput,
): Promise<Result<PagedProducts>> {
  const parsed = getProductsBySectionSchema.safeParse(input);

  if (!parsed.success) {
    return fail("errors.validation", parsed.error.flatten().fieldErrors);
  }

  const { sectionId, inStockOnly, minPrice, maxPrice, page, pageSize } =
    parsed.data;

  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  if (inStockOnly !== undefined) {
    params.set("inStockOnly", String(inStockOnly));
  }
  if (minPrice !== undefined) params.set("minPrice", String(minPrice));
  if (maxPrice !== undefined) params.set("maxPrice", String(maxPrice));

  // Either — isFavorite when JWT present
  return fetchJson<PagedProducts>(
    `/api/sections/${sectionId}/products?${params}`,
    {
      next: {
        revalidate: REVALIDATE.minute * 5,
        tags: [CACHE_TAGS.sectionProducts(sectionId)],
      },
    },
  );
}