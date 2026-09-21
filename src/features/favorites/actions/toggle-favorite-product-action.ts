// features/favorites/actions/toggle-favorite-product-action.ts
"use server";

import { updateTag } from "next/cache";
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import { CACHE_TAGS } from "@/shared/config/cache";
import {
  toggleFavoriteProductSchema,
  type ToggleFavoriteProductInput,
} from "../schemas/favorites.schema";

export async function toggleFavoriteProduct(
  input: ToggleFavoriteProductInput,
): Promise<Result<void>> {
  const parsed = toggleFavoriteProductSchema.safeParse(input);

  if (!parsed.success) {
    return fail("errors.validation", parsed.error.flatten().fieldErrors);
  }

  const { productId, isFavorite } = parsed.data;

  const result = await fetchJson<void>(
    `/api/favorites/products/${productId}`,
    {
      method: isFavorite ? "DELETE" : "POST",
    },
  );

  if (result.success) {
    updateTag(CACHE_TAGS.favoriteProducts);
  }

  return result;
}