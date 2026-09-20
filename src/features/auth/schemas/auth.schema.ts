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
  storeId: z.string().optional(),
  guestToken: z.string().optional(),
});

export type LoginInput = z.infer<typeof loginSchema>;

export const registerSchema = z.object({
  firstName: z.string().trim().min(1, "errors.nameRequired"),
  lastName: z.string().trim().min(1, "errors.nameRequired"),
  email: z
    .string()
    .trim()
    .min(1, "errors.invalidEmail")
    .email("errors.invalidEmail")
    .transform((v) => v.toLowerCase()),
  password: z.string().min(1, "errors.invalidPassword"),
});

export type RegisterInput = z.infer<typeof registerSchema>;

export const verifyEmailSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "errors.invalidEmail")
    .email("errors.invalidEmail")
    .transform((v) => v.toLowerCase()),
  code: z.string().trim().min(1, "errors.invalidCode"),
});

export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>;

export const resendVerificationSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "errors.invalidEmail")
    .email("errors.invalidEmail")
    .transform((v) => v.toLowerCase()),
});

export type ResendVerificationInput = z.infer<typeof resendVerificationSchema>;

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "errors.invalidEmail")
    .email("errors.invalidEmail")
    .transform((v) => v.toLowerCase()),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "errors.invalidEmail")
    .email("errors.invalidEmail")
    .transform((v) => v.toLowerCase()),
  code: z.string().trim().min(1, "errors.invalidCode"),
  newPassword: z.string().min(1, "errors.invalidPassword"),
});

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;

export const googleLoginSchema = z.object({
  idToken: z.string().trim().min(1, "errors.generic"),
});

export type GoogleLoginInput = z.infer<typeof googleLoginSchema>;

export const refreshTokenSchema = z.object({
  refreshToken: z.string().min(1, "errors.unauthorized"),
});

export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>;

export const logoutSchema = z.object({
  refreshToken: z.string().min(1, "errors.unauthorized"),
});

export type LogoutInput = z.infer<typeof logoutSchema>;