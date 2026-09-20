// shared/lib/http/fetch-json.ts
import { cookies } from "next/headers";
import { getAccessToken, getGuestToken } from "./token-storage";
import { Result, ok, fail } from "../result";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public path?: string
  ) {
    super(message);
    this.name = "ApiError";
  }
}
interface FetchJsonOptions {
  method?: HttpMethod;
  body?: unknown;
  headers?: HeadersInit;
  locale?: string;
  authToken?: string | null; // pass null to force "no auth" even if logged in
  guestToken?: string | null;
  timeoutMs?: number;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
}

const STATUS_ERROR_KEYS: Record<number, string> = {
  400: "errors.badRequest",
  401: "errors.unauthorized",
  403: "errors.forbidden",
  404: "errors.notFound",
  409: "errors.conflict",
  422: "errors.validation",
  429: "errors.rateLimited",
};

function statusToErrorKey(status: number): string {
  if (STATUS_ERROR_KEYS[status]) return STATUS_ERROR_KEYS[status];
  console.error(`[fetchJson] Unmapped HTTP status ${status}`);
  if (status >= 500) return "errors.server";
  return "errors.generic";
}

export async function fetchJson<T>(
  path: string,
  options: FetchJsonOptions = {}
): Promise<Result<T>> {
  if (!BASE_URL) {
    console.error("[fetchJson] NEXT_PUBLIC_API_URL is not defined.");
    return fail("errors.server");
  }

  const {
    method = "GET",
    body,
    locale,
    authToken,
    guestToken,
    timeoutMs = 8000,
    cache,
    next,
    headers: extraHeaders,
  } = options;

  try {
    const cookieStore = await cookies();
    const resolvedLocale = locale ?? cookieStore.get("locale")?.value ?? "en";
    const token = authToken !== undefined ? authToken : await getAccessToken();
    const guest =
      guestToken !== undefined ? guestToken : token ? undefined : await getGuestToken();
    const headers: HeadersInit = {
      Accept: "application/json",
      "Accept-Language": resolvedLocale,
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(token ? { Authorization: `Bearer ${token}` } : guest ? { "X-Guest-Token": guest } : {}),
      ...extraHeaders,
    };

    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal: AbortSignal.timeout(timeoutMs),
      cache,
      next,
    });

    if (res.status === 204) return ok(undefined as T);

    const text = await res.text();
    let json: unknown = null;

    if (text.trim()) {
      try {
        json = JSON.parse(text);
      } catch {
        console.error(`[fetchJson] ${path} returned non-JSON body`);
        return fail(res.ok ? "errors.generic" : statusToErrorKey(res.status));
      }
    }

    if (!res.ok) {
      const errorBody = json as {
        message?: string;
        detail?: string;
        title?: string;
        errors?: Record<string, string[] | string>;
      } | null;

      const fieldErrors = errorBody?.errors
        ? Object.fromEntries(
            Object.entries(errorBody.errors).map(([field, msgs]) => [
              field,
              Array.isArray(msgs) ? msgs : [msgs],
            ])
          )
        : undefined;

      // Full detail (status, backend message) is logged server-side only —
      // the client gets nothing but the mapped i18n key + optional fieldErrors.
      console.error(
        `[fetchJson] ${method} ${path} -> ${res.status}: ${errorBody?.message ?? errorBody?.detail ?? res.statusText}`
      );

      return fail(statusToErrorKey(res.status), fieldErrors);
    }

    return ok(json as T);
  } catch (error) {
    console.error(`[fetchJson] ${method} ${path} failed:`, error);
    return fail("errors.generic");
  }
}