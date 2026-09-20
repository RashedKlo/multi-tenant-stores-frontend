// features/orders/api/get-orders.ts
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import type { PagedOrders } from "../types";
import {
  getOrdersSchema,
  type GetOrdersInput,
} from "../schemas/orders.schema";

export async function getOrders(
  input: GetOrdersInput ,
): Promise<Result<PagedOrders>> {
  const parsed = getOrdersSchema.safeParse(input);

  if (!parsed.success) {
    return fail("errors.validation", parsed.error.flatten().fieldErrors);
  }

  const { status, page, pageSize } = parsed.data;
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  if (status !== undefined) params.set("status", String(status));

  return fetchJson<PagedOrders>(`/api/orders?${params.toString()}`, {
    next: {
      revalidate: REVALIDATE.minute * 2,
      tags: [CACHE_TAGS.orders],
    },
  });
}