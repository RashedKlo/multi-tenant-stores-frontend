// features/cart/api/get-cart.ts
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import {  type Result } from "@/shared/lib/result";
import type { CartItem} from "../types/cart.types";

export async function getCart(): Promise<Result<CartItem[]>> {
  const result = await fetchJson<CartItem[]>(
    `/api/cart`,
    {
      next: {
        revalidate: REVALIDATE.minute,
        tags: [CACHE_TAGS.cart],
      },
    },
  );
 return result;
}