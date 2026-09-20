// features/favorites/schemas/favorites.schema.ts
import { z } from "zod";

export const toggleFavoriteProductSchema = z.object({
  productId: z.string().trim().min(1, "errors.validation"),
  isFavorite: z.boolean(),
});

export const toggleFavoriteStoreSchema = z.object({
  storeId: z.string().trim().min(1, "errors.validation"),
  isFavorite: z.boolean(),
});

export type ToggleFavoriteProductInput = z.infer<
  typeof toggleFavoriteProductSchema
>;
export type ToggleFavoriteStoreInput = z.infer<
  typeof toggleFavoriteStoreSchema
>;