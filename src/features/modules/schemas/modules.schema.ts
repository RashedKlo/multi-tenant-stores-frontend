// features/modules/schemas/modules.schema.ts
import { z } from "zod";

export const getModuleDetailSchema = z.object({
  moduleId: z.string().trim().min(1, "errors.validation"),
});

export const getStoresByModuleSchema = z.object({
  moduleId: z.string().trim().min(1, "errors.validation"),
  categoryId: z.string().trim().min(1).optional(),
  search: z.string().trim().optional(),
  page: z.number().int().min(1).optional().default(1),
  pageSize: z.number().int().min(1).max(100).optional().default(20),
});

export type GetModuleDetailInput = z.infer<typeof getModuleDetailSchema>;
export type GetStoresByModuleInput = z.infer<typeof getStoresByModuleSchema>;