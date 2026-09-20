// features/cart/schemas/cart.schema.ts
import { z } from "zod";

export const addCartItemSchema = z.object({
  storeId: z.string().trim().min(1, "errors.validation"),
  productId: z.string().trim().min(1, "errors.validation"),
  quantity: z.number().int().min(1, "errors.validation"),
  optionIds: z.array(z.string().trim().min(1)).optional().default([]),
  notes: z.string().trim().optional().nullable(),
});

export const updateCartItemSchema = z.object({
  cartItemId: z.string().trim().min(1, "errors.validation"),
  storeId: z.string().trim().min(1, "errors.validation"),
  quantity: z.number().int().min(1, "errors.validation"),
});

export const removeCartItemSchema = z.object({
  cartItemId: z.string().trim().min(1, "errors.validation"),
  storeId: z.string().trim().min(1, "errors.validation"),
});

export const clearCartSchema = z.object({
  storeId: z.string().trim().min(1, "errors.validation"),
});

export type AddCartItemInput = z.infer<typeof addCartItemSchema>;
export type UpdateCartItemInput = z.infer<typeof updateCartItemSchema>;
export type RemoveCartItemInput = z.infer<typeof removeCartItemSchema>;
export type ClearCartInput = z.infer<typeof clearCartSchema>;