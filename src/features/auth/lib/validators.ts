// features/auth/lib/validators.ts

import { MIN_PASSWORD_LENGTH, VERIFICATION_CODE_LENGTH } from "../constants/auth";

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidPassword(password: string): boolean {
  return password.length >= MIN_PASSWORD_LENGTH;
}

export function isValidCode(code: string): boolean {
  return new RegExp(`^\\d{${VERIFICATION_CODE_LENGTH}}$`).test(code.trim());
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}
