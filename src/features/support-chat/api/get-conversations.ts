// features/support-chat/api/get-conversations.ts
import { fetchJson, ApiError } from "@/shared/lib/http/fetch-json";
import { getAccessToken } from "@/shared/lib/http/token-storage";
import type { ConversationSummary } from "../types";

export async function getConversations(): Promise<ConversationSummary[]> {
  const token = await getAccessToken();

  try {
    const data = await fetchJson<ConversationSummary[]>(
      "/api/support/conversations",
      {
        headers: { Authorization: `Bearer ${token}` },
        cache: "no-store",
      },
    );
    console.log("data");
    return Array.isArray(data) ? data : [];
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[getConversations] ${error.status}: ${error.message}`);
    }
        return [];

  }
}
