import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import type { StoreCoupon } from "../types";
import { getStoreCouponsSchema } from "../schemas/stores.schema";

export async function getStoreCoupons(
  storeId: string,
): Promise<Result<StoreCoupon[]>> {
  const parsed = getStoreCouponsSchema.safeParse({ storeId });

  if (!parsed.success) {
    return fail("errors.validation", parsed.error.flatten().fieldErrors);
  }

  return fetchJson<StoreCoupon[]>(
    `/api/stores/${parsed.data.storeId}/coupons`,
    {
      next: {
        revalidate: REVALIDATE.minute * 10,
        tags: [CACHE_TAGS.storeCoupons(parsed.data.storeId)],
      },
    },
  );
}
