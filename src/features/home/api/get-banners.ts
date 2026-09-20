// features/home/api/get-banners.ts
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS, REVALIDATE } from "@/shared/config/cache";
import type { Result } from "@/shared/lib/result";
import type { HomeBanner } from "../types/home.types";

export async function getHomeBanners(): Promise<Result<HomeBanner[]>> {
  return fetchJson<HomeBanner[]>("/api/home/banners", {
    next: {
      revalidate: REVALIDATE.hour,
      tags: [CACHE_TAGS.homeBanners],
    },
  });
}