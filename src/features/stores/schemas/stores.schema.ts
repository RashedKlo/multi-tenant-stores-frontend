// features/stores/schemas/stores.schema.ts
import { z } from "zod";

export const getStoreDetailSchema = z.object({
  storeId: z.string().trim().min(1, "errors.validation"),
});

export const getStoreBannersSchema = z.object({
  storeId: z.string().trim().min(1, "errors.validation"),
});

export const getStoreSectionsSchema = z.object({
  storeId: z.string().trim().min(1, "errors.validation"),
  page: z.number().int().min(1).optional().default(1),
  pageSize: z.number().int().min(1).max(100).optional().default(20),
});

export const getProductsBySectionSchema = z
  .object({
    sectionId: z.string().trim().min(1, "errors.validation"),
    inStockOnly: z.boolean().optional(),
    minPrice: z.number().min(0).optional(),
    maxPrice: z.number().min(0).optional(),
    page: z.number().int().min(1).optional().default(1),
    pageSize: z.number().int().min(1).max(100).optional().default(20),
  })
  .refine(
    (v) =>
      v.minPrice === undefined ||
      v.maxPrice === undefined ||
      v.minPrice <= v.maxPrice,
    { message: "errors.validation", path: ["maxPrice"] },
  );

export type GetStoreDetailInput = z.infer<typeof getStoreDetailSchema>;
export type GetStoreBannersInput = z.infer<typeof getStoreBannersSchema>;
export type GetStoreSectionsInput = z.infer<typeof getStoreSectionsSchema>;
export type GetProductsBySectionInput = z.infer<
  typeof getProductsBySectionSchema
>;