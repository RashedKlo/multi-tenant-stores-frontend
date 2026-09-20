// features/stores/api/get-store-detail.ts
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import type { StoreDetail } from "../types";
import { getStoreDetailSchema } from "../schemas/stores.schema";

export async function getStoreDetail(
  storeId: string,
): Promise<Result<StoreDetail>> {
  const parsed = getStoreDetailSchema.safeParse({ storeId });

  if (!parsed.success) {
    return fail("errors.validation", parsed.error.flatten().fieldErrors);
  }

  return fetchJson<StoreDetail>(`/api/stores/${parsed.data.storeId}`, {
    next: {
      revalidate: REVALIDATE.hour,
      tags: [CACHE_TAGS.storeDetail(parsed.data.storeId)],
    },
  });
}