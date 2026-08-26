// features/stores/api/get-product-detail.ts
import { fetchJson, ApiError } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import type { ProductDetail } from "../types";

export async function getProductDetail(
  productId: string
): Promise<ProductDetail | null> {
  try {
    return await fetchJson<ProductDetail>(`/api/products/${productId}`, {
      next: {
        revalidate: REVALIDATE.minute * 10,
        // tags: [CACHE_TAGS.productDetail(productId)],
      },
    });
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[getProductDetail] ${error.message} (${error.path})`);
    } else {
      console.error("[getProductDetail] Unexpected error:", error);
    }
    return null;
  }
}