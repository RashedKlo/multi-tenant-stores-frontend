
"use server";

import { updateTag } from "next/cache";
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import { CACHE_TAGS } from "@/shared/config/cache";
import {
  toggleFavoriteStoreSchema,
  type ToggleFavoriteStoreInput,
} from "../schemas/favorites.schema";

export async function toggleFavoriteStore(
  input: ToggleFavoriteStoreInput,
): Promise<Result<void>> {
  const parsed = toggleFavoriteStoreSchema.safeParse(input);

  if (!parsed.success) {
    return fail("errors.validation", parsed.error.flatten().fieldErrors);
  }

  const { storeId, isFavorite } = parsed.data;

  const result = await fetchJson<void>(`/api/favorites/stores/${storeId}`, {
    method: isFavorite ? "DELETE" : "POST",
  });

  if (result.success) {
    updateTag(CACHE_TAGS.favoriteStores);
  }

  return result;
}