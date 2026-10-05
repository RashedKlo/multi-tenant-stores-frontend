import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import type { PagedDiscountedProducts } from "../types";
import {
  getDiscountedProductsSchema,
  type GetDiscountedProductsInput,
} from "../schemas/stores.schema";

export async function getDiscountedProducts(
  input: GetDiscountedProductsInput,
): Promise<Result<PagedDiscountedProducts>> {
  const parsed = getDiscountedProductsSchema.safeParse(input);

  if (!parsed.success) {
    return fail("errors.validation", parsed.error.flatten().fieldErrors);
  }

  const { storeId, page, pageSize } = parsed.data;
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  return fetchJson<PagedDiscountedProducts>(
    `/api/stores/${storeId}/discounted-products?${params}`,
    {
      next: {
        revalidate: REVALIDATE.minute * 10,
        tags: [CACHE_TAGS.storeDiscountedProducts(storeId)],
      },
    },
  );
}
