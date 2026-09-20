// features/support-chat/api/get-conversations.ts
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { CACHE_TAGS } from "@/shared/config/cache";
import type { Result } from "@/shared/lib/result";
import type { ConversationSummary } from "../types";

/** Always fresh — list updates via SignalR + mutations. */
export async function getConversations(): Promise<
  Result<ConversationSummary[]>
> {
  return fetchJson<ConversationSummary[]>("/api/support/conversations", {
    cache: "no-store",
    next: {
      tags: [CACHE_TAGS.supportConversations],
    },
  });
}