// features/addresses/schemas/address.schema.ts
import { z } from "zod";

export const addressSchema = z.object({
  label: z
    .string()
    .min(2, "Label must be at least 2 characters")
    .max(50, "Label is too long"),
  addressText: z
    .string()
    .min(5, "Please enter a more detailed address")
    .max(200, "Address is too long"),
  latitude: z.number().min(-90).max(90),
  longitude: z.number().min(-180).max(180),
  isDefault: z.boolean().optional().default(false),
});

export type AddressFormValues = z.infer<typeof addressSchema>;