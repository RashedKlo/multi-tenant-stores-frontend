// features/stores/api/get-store-banners.ts
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import type { StoreBanner } from "../types";
import { getStoreBannersSchema } from "../schemas/stores.schema";

export async function getStoreBanners(
  storeId: string,
): Promise<Result<StoreBanner[]>> {
  const parsed = getStoreBannersSchema.safeParse({ storeId });

  if (!parsed.success) {
    return fail("errors.validation", parsed.error.flatten().fieldErrors);
  }

  return fetchJson<StoreBanner[]>(
    `/api/stores/${parsed.data.storeId}/banners`,
    {
      next: {
        revalidate: REVALIDATE.hour,
        tags: [CACHE_TAGS.storeBanners(parsed.data.storeId)],
      },
    },
  );
}