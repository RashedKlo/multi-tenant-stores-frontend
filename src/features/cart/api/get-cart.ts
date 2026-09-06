// src/features/cart/api/get-cart.ts
import { fetchJson, ApiError } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS } from "@/shared/config/cache";
import type { CartItem} from "../types/cart.types";

export async function getCart(): Promise<CartItem[]> {
  try {
    return await fetchJson<CartItem[]>("/api/cart", {
      method: "GET",
      cache: "no-store",
      next: { tags: [CACHE_TAGS.cart] },
    });
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[getCart] ${error.status} ${error.message}`);
    } else {
      console.error("[getCart] Unexpected error:", error);
    }

    throw error;
  }
}
