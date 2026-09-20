// features/addresses/schemas/address.schema.ts
import { z } from "zod";

export const createAddressSchema = z.object({
  label: z.string().trim().min(1, "errors.validation"),
  latitude: z.number().min(-90, "errors.validation").max(90, "errors.validation"),
  longitude: z.number().min(-180, "errors.validation").max(180, "errors.validation"),
  addressText: z.string().trim().min(1, "errors.validation"),
  isDefault: z.boolean().optional().default(false),
});

export const updateAddressSchema = z.object({
  label: z.string().trim().min(1, "errors.validation"),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  addressText: z.string().trim().min(1, "errors.validation"),
});

export type UpdateAddressInput = z.infer<typeof updateAddressSchema>;
export type CreateAddressInput = z.infer<typeof createAddressSchema>;