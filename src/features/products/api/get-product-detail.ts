// features/products/api/get-product-detail.ts
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import type { ProductDetail } from "../types";

export async function getProductDetail(
  productId: string,
): Promise<Result<ProductDetail>> {
 

  if (!productId) {
    return fail("errors.validation");
  }

  // Either auth — JWT optional; isFavorite filled when logged in
  return fetchJson<ProductDetail>(
    `/api/products/${productId}`,
    {
      next: {
        revalidate: REVALIDATE.minute * 10,
        tags: [CACHE_TAGS.productDetail(productId)],
      },
    },
  );
}