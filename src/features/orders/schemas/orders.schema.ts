// features/orders/schemas/orders.schema.ts
import { z } from "zod";

export const getOrdersSchema = z.object({
  status: z.number().int().optional(),
  page: z.number().int().min(1).optional().default(1),
  pageSize: z.number().int().min(1).max(100).optional().default(20),
});

export const getOrderSchema = z.object({
  orderId: z.string().trim().min(1, "errors.validation"),
});

export type GetOrdersInput = z.infer<typeof getOrdersSchema>;
export type GetOrderInput = z.infer<typeof getOrderSchema>;