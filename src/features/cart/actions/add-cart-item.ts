// src/features/cart/actions/add-cart-item.ts
"use server";

import { ApiError, fetchJson } from "@/shared/lib/http/fetch-json";
import type { AddCartItemInput, CartActionResult } from "../types/cart.types";

export async function addCartItemAction(
  input: AddCartItemInput,
): Promise<CartActionResult> {
  if (!input.storeId || !input.productId) {
    return { success: false, error: "Invalid product or store" };
  }
  if (!input.quantity || input.quantity < 1) {
    return { success: false, error: "Quantity must be at least 1" };
  }

  try {
    await fetchJson("/api/cart/items", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      allowEmptyResponse: true,
      body: JSON.stringify({
        storeId: input.storeId,
        productId: input.productId,
        quantity: input.quantity,
        notes: input.notes ?? null,
        optionIds: input.optionIds ?? [],
      }),
    });

    // revalidateTag(CACHE_TAGS.cart,{expire: 60 * 5}); // Revalidate cart cache for 5 minutes
    return { success: true, data: undefined };
  } catch (error) {
    console.error("[addCartItemAction]", error);
    return {
      success: false,
      error: error instanceof ApiError ? error.message : "Failed to add item to cart",
    };
  }
}
