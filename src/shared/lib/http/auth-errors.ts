// features/auth/lib/auth-errors.ts

import { ApiError } from "@/shared/lib/http/fetch-json";

/**
 * Map HTTP / API failures to stable i18n keys under `auth.errors.*`.
 * Forms look up these keys with useTranslations("auth").
 */
export function toAuthErrorKey(error: unknown): string {
  if (error instanceof ApiError) {
    switch (error.status) {
      case 400:
        return "errors.badRequest";
      case 401:
        return "errors.invalidCredentials";
      case 403:
        return "errors.forbidden";
      case 404:
        return "errors.notFound";
      case 409:
        return "errors.conflict";
      case 422:
        return "errors.validation";
      case 429:
        return "errors.rateLimited";
      default:
        if (error.status >= 500) return "errors.server";
        return "errors.generic";
    }
  }
  return "errors.generic";
}