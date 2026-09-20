// features/support-chat/api/get-messages.ts
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import { CACHE_TAGS } from "@/shared/config/cache";
import type { PagedMessages } from "../types";
import {
  getMessagesSchema,
  type GetMessagesInput,
} from "../schemas/support-chat.schema";

export async function getMessages(
  input: GetMessagesInput,
): Promise<Result<PagedMessages>> {
  const parsed = getMessagesSchema.safeParse(input);

  if (!parsed.success) {
    return fail("errors.validation", parsed.error.flatten().fieldErrors);
  }

  const { conversationId, page, pageSize } = parsed.data;
  const qs = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
  });

  return fetchJson<PagedMessages>(
    `/api/support/conversations/${conversationId}/messages?${qs}`,
    {
      cache: "no-store",
      next: {
        tags: [
          CACHE_TAGS.supportMessages(conversationId),
          CACHE_TAGS.supportConversations,
        ],
      },
    },
  );
}