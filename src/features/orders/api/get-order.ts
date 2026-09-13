// features/orders/api/get-order.ts
import { fetchJson, ApiError } from "@/shared/lib/http/fetch-json";
import { getAccessToken } from "@/shared/lib/http/token-storage";
import type { OrderDetail } from "../types";

export async function getOrder(orderId: string): Promise<OrderDetail> {
  const token = await getAccessToken();

  try {
    return await fetchJson<OrderDetail>(`/api/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      // Always fresh for tracking
      cache: "no-store",
    });
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[getOrder] ${error.status}: ${error.message}`);
    }
    throw error;
  }
}
