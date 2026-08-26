// src/features/cart/api/get-cart.ts
import { fetchJson, ApiError } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS } from "@/shared/config/cache";
import type { Cart } from "../types";
import { isCartEmpty } from "../lib/cart-helpers";

/**
 * GET /api/cart?storeId=...
 * Backend always returns CartDto (empty cart if none exists).
 */
export async function getCart(storeId: string): Promise<Cart > {
  try {
    const cart = await fetchJson<Cart>(
      `/api/cart?storeId=${encodeURIComponent(storeId)}`,
      { next: { tags: [CACHE_TAGS.cart] } },
    );

    return {
      ...cart,
    };
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[getCart] ${error.message}`);
    } else {
      console.error("[getCart] Unexpected error:", error);
    }

    // Safe empty cart so UI never crashes
    return {
      cartId: null,
      storeId,
      items: [],
      subtotal: 0,
      totalItemCount: 0,
    };
  }
}