// src/features/cart/api/get-cart.ts
import { fetchJson, ApiError } from "@/shared/lib/http/fetch-json";
import type { CartItem, RawCartItem } from "../types/cart.types";
import { normalizeCartItem } from "../types/cart.types";
import { getAccessToken, getGuestToken } from "@/shared/lib/http/token-storage";

export async function getCart(): Promise<CartItem[]> {
  const token = await getAccessToken();
  const guest=await getGuestToken();
  try {
    const data = await fetchJson<RawCartItem[]>("/api/cart", {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
        "X-Guest-Session":`${guest}`,
      },
      method: "GET",
    });

    return (Array.isArray(data) ? data : []).map(normalizeCartItem);
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[getCart] ${error.status} ${error.message}`);
    } else {
      console.error("[getCart] Unexpected error:", error);
    }

    return [];
  }
}
