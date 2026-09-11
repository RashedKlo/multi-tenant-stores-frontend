// src/features/cart/actions/remove-cart-item.ts
"use server";

import { fetchJson } from "@/shared/lib/http/fetch-json";
import type { CartActionResult, RemoveCartItemInput } from "../types/cart.types";
import { getAccessToken } from "@/shared/lib/http/token-storage";

export async function removeCartItemAction(
  input: RemoveCartItemInput,
): Promise<CartActionResult> {
  if (!input.cartItemId || !input.storeId) {
    return { success: false, error: "Invalid cart item" };
  }
  const token=await getAccessToken();
  try {
    await fetchJson(
      `/api/cart/items/${input.cartItemId}?storeId=${encodeURIComponent(input.storeId)}`,
      {
        headers: {
               "authorization": `Bearer ${token}`,

        "Content-Type": "application/json",
      },
        method: "DELETE",
        allowEmptyResponse: true,
      },
    );

    // revalidateTag(CACHE_TAGS.cart);
    return { success: true, data: undefined };
  } catch (error) {
    console.error("[removeCartItemAction]", error);
    return { success: false, error: "Failed to remove item" };
  }
}
