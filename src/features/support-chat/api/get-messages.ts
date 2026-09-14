// features/support-chat/api/get-messages.ts
import { fetchJson, ApiError } from "@/shared/lib/http/fetch-json";
import { getAccessToken } from "@/shared/lib/http/token-storage";
import type { PagedMessages } from "../types";

export async function getMessages(
  conversationId: string,
  page = 1,
  pageSize = 30,
): Promise<PagedMessages> {
  const token = await getAccessToken();
  const qs = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  try {
    return await fetchJson<PagedMessages>(
      `/api/support/conversations/${conversationId}/messages?${qs}`,
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      },
    );
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[getMessages] ${error.status}: ${error.message}`);
    }
    throw error;
  }
}
