// features/profile/schemas/profile.schema.ts
import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z.string().trim().min(1, "errors.nameRequired"),
  lastName: z.string().trim().min(1, "errors.nameRequired"),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "errors.invalidPassword"),
  newPassword: z.string().min(1, "errors.invalidPassword"),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;