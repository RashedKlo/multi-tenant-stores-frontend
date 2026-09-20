// features/modules/api/get-stores-by-module.ts
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import type { PagedStores } from "../types";
import {
  getStoresByModuleSchema,
  type GetStoresByModuleInput,
} from "../schemas/modules.schema";

export async function getStoresByModule(
  input: GetStoresByModuleInput,
): Promise<Result<PagedStores>> {
  const parsed = getStoresByModuleSchema.safeParse(input);

  if (!parsed.success) {
    return fail("errors.validation", parsed.error.flatten().fieldErrors);
  }

  const { moduleId, categoryId, search, page, pageSize } = parsed.data;

  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  if (categoryId) params.set("categoryId", categoryId);
  if (search) params.set("search", search);

  return fetchJson<PagedStores>(
    `/api/modules/${moduleId}/stores?${params.toString()}`,
    {
      next: {
        revalidate: REVALIDATE.minute * 5,
        tags: [CACHE_TAGS.moduleStores(moduleId)],
      },
    },
  );
}