// features/modules/api/get-module-detail.ts
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import type { ModuleDetail } from "../types";
import { getModuleDetailSchema } from "../schemas/modules.schema";

export async function getModuleDetail(
  moduleId: string,
): Promise<Result<ModuleDetail>> {
  const parsed = getModuleDetailSchema.safeParse({ moduleId });

  if (!parsed.success) {
    return fail("errors.validation", parsed.error.flatten().fieldErrors);
  }

  return fetchJson<ModuleDetail>(
    `/api/modules/${parsed.data.moduleId}`,
    {
      next: {
        revalidate: REVALIDATE.hour,
        tags: [CACHE_TAGS.moduleDetail(parsed.data.moduleId)],
      },
    },
  );
}