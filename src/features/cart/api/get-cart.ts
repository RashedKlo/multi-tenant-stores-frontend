// features/cart/api/get-cart.ts
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS } from "@/shared/config/cache";
import type { Cart } from "../types";

/**
 * Get current cart. Backend guarantees a CartDto (empty if none exists) — never throws for missing cart.
 */
export async function getCart(storeId: string): Promise<Cart> {
  return fetchJson<Cart>(
    `/api/cart?storeId=${encodeURIComponent(storeId)}`,
    { next: { tags: [CACHE_TAGS.cart] } },
  );
}
