// features/orders/api/get-orders.ts
import { fetchJson, ApiError } from "@/shared/lib/http/fetch-json";
import { getAccessToken } from "@/shared/lib/http/token-storage";
import type { PagedOrders } from "../types";

export async function getOrders(options?: {
  status?: number;
  page?: number;
  pageSize?: number;
}): Promise<PagedOrders> {
  const token = await getAccessToken();
  const params = new URLSearchParams();
  if (options?.status !== undefined) params.set("status", String(options.status));
  if (options?.page) params.set("page", String(options.page));
  if (options?.pageSize) params.set("pageSize", String(options.pageSize));

  const qs = params.toString();
  const path = qs ? `/api/orders?${qs}` : "/api/orders";

  try {
    return await fetchJson<PagedOrders>(path, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[getOrders] ${error.status}: ${error.message}`);
    }
    throw error;
  }
}
