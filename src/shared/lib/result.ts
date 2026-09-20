// shared/lib/result.ts

export type Result<T> =
  | { success: true; data: T }
  | {
      success: false;
      error: string; // i18n key — safe to show the client as-is
      fieldErrors?: Record<string, string[]>; // optional: per-field messages for forms
    };

export function ok<T>(data: T): Result<T> {
  return { success: true, data };
}

export function fail<T = never>(
  error: string,
  fieldErrors?: Record<string, string[]>
): Result<T> {
  return fieldErrors ? { success: false, error, fieldErrors } : { success: false, error };
}