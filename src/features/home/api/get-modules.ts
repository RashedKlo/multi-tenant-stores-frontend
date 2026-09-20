// features/home/api/get-modules.ts
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import type { Result } from "@/shared/lib/result";
import type { Module } from "../types/home.types";

export async function getModules(): Promise<Result<Module[]>> {
  return fetchJson<Module[]>("/api/modules", {
    next: {
      revalidate: REVALIDATE.hour,
      tags: [CACHE_TAGS.modules],
    },
  });
}