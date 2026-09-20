// features/orders/api/get-order.ts
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import { CACHE_TAGS } from "@/shared/config/cache";
import type { OrderDetail } from "../types";
import { getOrderSchema } from "../schemas/orders.schema";


export async function getOrder(
  orderId: string,
): Promise<Result<OrderDetail>> {
  const parsed = getOrderSchema.safeParse({ orderId });

  if (!parsed.success) {
    return fail("errors.validation", parsed.error.flatten().fieldErrors);
  }

  return fetchJson<OrderDetail>(`/api/orders/${parsed.data.orderId}`, {
    cache: "no-store",
    next: {
      tags: [CACHE_TAGS.order(parsed.data.orderId), CACHE_TAGS.orders],
    },
  });
}