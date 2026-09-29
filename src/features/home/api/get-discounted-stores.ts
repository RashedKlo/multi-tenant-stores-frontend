import { fetchJson } from "@/shared/lib/http/fetch-json";
import { REVALIDATE } from "@/shared/config/cache";
import type { Result } from "@/shared/lib/result";
import type { PagedDiscountedStores } from "../types/home.types";

export async function getDiscountedStores(input?: {
  page?: number;
  pageSize?: number;
}): Promise<Result<PagedDiscountedStores>> {
  const params = new URLSearchParams({
    page: String(input?.page ?? 1),
    pageSize: String(input?.pageSize ?? 10),
  });

  return fetchJson<PagedDiscountedStores>(`/api/stores/discounted?${params}`, {
    next: { revalidate: REVALIDATE.minute },
  });
}
