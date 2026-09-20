// features/cart/actions/clear-cart.ts
"use server";

import { updateTag } from "next/cache";
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import { CACHE_TAGS } from "@/shared/config/cache";
import {
  clearCartSchema,
  type ClearCartInput,
} from "../schemas/cart.schema";

export async function clearCartAction(
  input: ClearCartInput,
): Promise<Result<void>> {
  const parsed = clearCartSchema.safeParse(input);

  if (!parsed.success) {
    return fail("errors.validation", parsed.error.flatten().fieldErrors);
  }

  const result = await fetchJson<void>(
    `/api/cart?storeId=${encodeURIComponent(parsed.data.storeId)}`,
    { method: "DELETE" },
  );

  if (result.success) {
    updateTag(CACHE_TAGS.cart);
  }

  return result;
}