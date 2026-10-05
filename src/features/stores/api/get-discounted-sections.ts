import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import type { PagedDiscountedSections } from "../types";
import {
  getDiscountedSectionsSchema,
  type GetDiscountedSectionsInput,
} from "../schemas/stores.schema";

export async function getDiscountedSections(
  input: GetDiscountedSectionsInput,
): Promise<Result<PagedDiscountedSections>> {
  const parsed = getDiscountedSectionsSchema.safeParse(input);

  if (!parsed.success) {
    return fail("errors.validation", parsed.error.flatten().fieldErrors);
  }

  const { storeId, page, pageSize } = parsed.data;
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  return fetchJson<PagedDiscountedSections>(
    `/api/stores/${storeId}/discounted-sections?${params}`,
    {
      next: {
        revalidate: REVALIDATE.minute * 10,
        tags: [CACHE_TAGS.storeDiscountedSections(storeId)],
      },
    },
  );
}
