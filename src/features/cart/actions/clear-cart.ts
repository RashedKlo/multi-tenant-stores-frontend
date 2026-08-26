// features/cart/actions/clear-cart.ts
"use server";

import { revalidateTag } from "next/cache";
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS } from "@/shared/config/cache";

type ActionResult<T = undefined> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function clearCartAction(input: {
  storeId: string;
}): Promise<ActionResult> {
  try {
    await fetchJson(`/api/cart?storeId=${encodeURIComponent(input.storeId)}`, {
      method: "DELETE",
    });

    revalidateTag(CACHE_TAGS.cart);
    return { success: true, data: undefined };
  } catch (error) {
    console.error("[clearCartAction]", error);
    return { success: false, error: "Failed to clear cart" };
  }
}
