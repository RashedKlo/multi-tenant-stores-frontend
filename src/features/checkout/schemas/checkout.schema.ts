import { z } from "zod";

export const createCheckoutSchema = z.object({
  storeId: z.string().trim().min(1, "errors.validation"),
  addressId: z.string().trim().min(1, "errors.validation"),
  deliveryPhone: z.string().trim().optional().nullable(),
});

export type CreateCheckoutInput = z.infer<typeof createCheckoutSchema>;