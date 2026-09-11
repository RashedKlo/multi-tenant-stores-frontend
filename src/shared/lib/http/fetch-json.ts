// shared/lib/http/fetch-json.ts
import { cookies } from "next/headers";
import { getAccessToken } from "./token-storage";

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

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface FetchJsonOptions extends RequestInit {
  next?: NextFetchRequestConfig;
  timeoutMs?: number;
  allowEmptyResponse?: boolean;
  /** Override the locale from the cookie if needed */
  locale?: string;
}

/**
 * Shared server-side JSON fetch client.
 * Automatically reads the locale cookie and sends it as Accept-Language
 * so the backend can return already-localized fields.
 */
export async function fetchJson<T>(
  path: string,
  { timeoutMs = 8000, allowEmptyResponse = false, ...options }: FetchJsonOptions = {}
): Promise<T> {
  if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined. Check your .env file.");
  }

  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value ?? "en";
  const token = await getAccessToken();
  const headers: HeadersInit = {
    Accept: "application/json",
    "Accept-Language": locale,
    ...options.headers,
  };

  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    signal: AbortSignal.timeout(timeoutMs),
    headers,
  });

  if (!res.ok) {
    const body = await res.text();
    throw new ApiError(
      res.status,
      getApiErrorMessage(body, `${res.status} ${res.statusText}`),
      path
    );
  }

  if (allowEmptyResponse && res.status === 204) {
    return undefined as T;
  }

  // Safe parse
  let data: unknown;
  try {
    const body = await res.text();
    if (!body.trim() && allowEmptyResponse) {
      return undefined as T;
    }
    data = JSON.parse(body);
  } catch {
    throw new ApiError(res.status, "Response is not valid JSON", path);
  }

  if (data === null || data === undefined) {
    throw new ApiError(res.status, "Empty response body", path);
  }

  return data as T;
}

function getApiErrorMessage(body: string, fallback: string): string {
  if (!body.trim()) return fallback;

  try {
    const payload = JSON.parse(body) as {
      detail?: string;
      title?: string;
      message?: string;
      errors?: Record<string, string[] | string>;
    };

    const validationErrors = payload.errors
      ? Object.values(payload.errors)
          .flatMap((value) => (Array.isArray(value) ? value : [value]))
          .join("; ")
      : "";

    return payload.detail ?? payload.message ?? validationErrors ?? payload.title ?? fallback;
  } catch {
    return body.trim() || fallback;
  }
}