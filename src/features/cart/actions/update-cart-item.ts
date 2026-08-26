// features/cart/actions/update-cart-item.ts
"use server";

import { revalidateTag } from "next/cache";
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS } from "@/shared/config/cache";

interface UpdateCartItemInput {
  cartItemId: string;
  storeId: string;
  quantity: number;
  notes?: string;
}

type ActionResult<T = undefined> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function updateCartItemAction(
  input: UpdateCartItemInput,
): Promise<ActionResult> {
  try {
    await fetchJson(`/api/cart/items/${input.cartItemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        storeId: input.storeId,
        quantity: input.quantity,
        notes: input.notes,
      }),
    });

    revalidateTag(CACHE_TAGS.cart);
    return { success: true, data: undefined };
  } catch (error) {
    console.error("[updateCartItemAction]", error);
    return { success: false, error: "Failed to update item" };
  }
}
