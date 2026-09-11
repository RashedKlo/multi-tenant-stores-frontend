// src/features/cart/actions/update-cart-item.ts
"use server";

import { fetchJson } from "@/shared/lib/http/fetch-json";
import type { CartActionResult, UpdateCartItemInput } from "../types/cart.types";
import { getAccessToken } from "@/shared/lib/http/token-storage";

export async function updateCartItemAction(
  input: UpdateCartItemInput,
): Promise<CartActionResult> {
  if (!input.cartItemId || !input.storeId) {
    return { success: false, error: "Invalid cart item" };
  }
  if (!input.quantity || input.quantity < 1) {
    return { success: false, error: "Quantity must be at least 1" };
  }
  const token=await getAccessToken();

  try {
    await fetchJson(`/api/cart/items/${input.cartItemId}`, {
      method: "PUT",
      headers: {
               "authorization": `Bearer ${token}`,

        "Content-Type": "application/json",
      },
      allowEmptyResponse: true,
      body: JSON.stringify({
        storeId: input.storeId,
        quantity: input.quantity,
      }),
    });

    // revalidateTag(CACHE_TAGS.cart);
    return { success: true, data: undefined };
  } catch (error) {
    console.error("[updateCartItemAction]", error);
    return { success: false, error: "Failed to update item" };
  }
}
