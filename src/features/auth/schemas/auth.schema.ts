// features/auth/schemas/auth.schema.ts
import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "errors.invalidEmail")
    .email("errors.invalidEmail")
    .transform((v) => v.toLowerCase()),
  password: z.string().min(1, "errors.invalidPassword"),
  storeId: z.string().nullable().optional(),
  guestToken: z.string().nullable().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;