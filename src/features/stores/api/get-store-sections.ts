// features/stores/api/get-store-sections.ts
import { fetchJson, ApiError } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import type { PagedStoreSections } from "../types";

interface Params {
  storeId: string;
  page?: number;
  pageSize?: number;
}

export async function getStoreSections({
  storeId,
  page = 1,
  pageSize = 20,
}: Params): Promise<PagedStoreSections> {
  try {
    const params = new URLSearchParams({
      page: String(page),
      pageSize: String(pageSize),
    });

    return await fetchJson<PagedStoreSections>(
      `/api/stores/${storeId}/sections?${params}`,
      {
        next: {
          revalidate: REVALIDATE.minute * 10,
          tags: [CACHE_TAGS.storeSections(storeId)],
        },
      }
    );
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[getStoreSections] ${error.message}`);
    }
    return {
      items: [],
      page,
      pageSize,
      totalCount: 0,
      hasNextPage: false,
    };
  }
}