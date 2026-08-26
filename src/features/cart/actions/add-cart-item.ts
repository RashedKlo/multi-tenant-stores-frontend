// features/cart/actions/add-cart-item.ts
"use server";

import { revalidateTag } from "next/cache";
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS } from "@/shared/config/cache";

interface AddCartItemInput {
  storeId: string;
  productId: string;
  quantity: number;
  optionIds: string[];
  notes?: string;
}

type ActionResult<T = undefined> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function addCartItemAction(
  input: AddCartItemInput,
): Promise<ActionResult<{ itemCount: number }>> {
  try {
    const data = await fetchJson<{ itemCount: number }>("/api/cart/items", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });

    revalidateTag(CACHE_TAGS.cart);
    return { success: true, data };
  } catch (error) {
    console.error("[addCartItemAction]", error);
    return { success: false, error: "Failed to add item to cart" };
  }
}
