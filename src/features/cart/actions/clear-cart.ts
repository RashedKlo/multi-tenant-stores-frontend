// src/features/cart/actions/clear-cart.ts
"use server";

import { fetchJson } from "@/shared/lib/http/fetch-json";
import type { CartActionResult, ClearCartInput } from "../types/cart.types";
import { getAccessToken } from "@/shared/lib/http/token-storage";

export async function clearCartAction(
  input: ClearCartInput,
): Promise<CartActionResult> {
  if (!input.storeId) {
    return { success: false, error: "Store is required" };
  }
const token=await getAccessToken();
  try {
    await fetchJson(`/api/cart?storeId=${encodeURIComponent(input.storeId)}`, {
      headers:{
        "authorization": `Bearer ${token}`,
      },
      method: "DELETE",
      allowEmptyResponse: true,
    });

    // revalidateTag(CACHE_TAGS.cart,{expire: 60 * 5}); // Revalidate cart cache for 5 minutes
    return { success: true, data: undefined };
  } catch (error) {
    console.error("[clearCartAction]", error);
    return { success: false, error: "Failed to clear cart" };
  }
}
