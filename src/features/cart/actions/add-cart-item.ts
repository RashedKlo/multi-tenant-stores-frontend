// features/cart/actions/add-cart-item.ts
"use server";

import { updateTag } from "next/cache";
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import { CACHE_TAGS } from "@/shared/config/cache";
import {
  addCartItemSchema,
  type AddCartItemInput,
} from "../schemas/cart.schema";

export async function addCartItemAction(
  input: AddCartItemInput,
): Promise<Result<void>> {
  const parsed = addCartItemSchema.safeParse(input);

  if (!parsed.success) {
    return fail("errors.validation", parsed.error.flatten().fieldErrors);
  }

  const result = await fetchJson<void>("/api/cart/items", {
    method: "POST",
    body: {
      storeId: parsed.data.storeId,
      productId: parsed.data.productId,
      quantity: parsed.data.quantity,
      optionIds: parsed.data.optionIds,
      notes: parsed.data.notes ?? null,
    },
  });

  if (result.success) {
    updateTag(CACHE_TAGS.cart);
  }

  return result;
}