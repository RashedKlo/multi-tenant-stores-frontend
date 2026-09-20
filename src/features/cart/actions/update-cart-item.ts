// features/cart/actions/update-cart-item.ts
"use server";

import { updateTag } from "next/cache";
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import { CACHE_TAGS } from "@/shared/config/cache";
import {
  updateCartItemSchema,
  type UpdateCartItemInput,
} from "../schemas/cart.schema";

export async function updateCartItemAction(
  input: UpdateCartItemInput,
): Promise<Result<void>> {
  const parsed = updateCartItemSchema.safeParse(input);

  if (!parsed.success) {
    return fail("errors.validation", parsed.error.flatten().fieldErrors);
  }

  const result = await fetchJson<void>(
    `/api/cart/items/${parsed.data.cartItemId}`,
    {
      method: "PUT",
      body: {
        storeId: parsed.data.storeId,
        quantity: parsed.data.quantity,
      },
    },
  );

  if (result.success) {
    updateTag(CACHE_TAGS.cart);
  }

  return result;
}