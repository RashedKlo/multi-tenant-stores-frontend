// shared/lib/http/fetch-json.ts
import { cookies } from "next/headers";

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
  { timeoutMs = 8000,   ...options }: FetchJsonOptions = {}
): Promise<T> {
  if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_API_URL is not defined. Check your .env file.");
  }

  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value ?? "en";

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
    throw new ApiError(
      res.status,
      `${res.status} ${res.statusText}`,
      path
    );
  }

  // Safe parse
  let data: unknown;
  try {
    data = await res.json();
  } catch {
    throw new ApiError(res.status, "Response is not valid JSON", path);
  }

  if (data === null || data === undefined) {
    throw new ApiError(res.status, "Empty response body", path);
  }

  return data as T;
}