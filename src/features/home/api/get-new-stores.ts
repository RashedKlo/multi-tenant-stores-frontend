import { fetchJson } from "@/shared/lib/http/fetch-json";
import { REVALIDATE } from "@/shared/config/cache";
import type { Result } from "@/shared/lib/result";
import type { PagedNewStores } from "../types/home.types";

export async function getNewStores(input?: { page?: number; pageSize?: number }): Promise<Result<PagedNewStores>> {
  const params = new URLSearchParams({
    page: String(input?.page ?? 1),
    pageSize: String(input?.pageSize ?? 10),
  });

  return fetchJson<PagedNewStores>(`/api/stores/new?${params}`, {
    next: { revalidate: REVALIDATE.minute },
  });
}
