// features/stores/api/get-store-sections.ts
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import type { PagedStoreSections } from "../types";
import {
  getStoreSectionsSchema,
  type GetStoreSectionsInput,
} from "../schemas/stores.schema";

export async function getStoreSections(
  input: GetStoreSectionsInput,
): Promise<Result<PagedStoreSections>> {
  const parsed = getStoreSectionsSchema.safeParse(input);

  if (!parsed.success) {
    return fail("errors.validation", parsed.error.flatten().fieldErrors);
  }

  const { storeId, page, pageSize } = parsed.data;
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  return fetchJson<PagedStoreSections>(
    `/api/stores/${storeId}/sections?${params}`,
    {
      next: {
        revalidate: REVALIDATE.minute * 10,
        tags: [CACHE_TAGS.storeSections(storeId)],
      },
    },
  );
}