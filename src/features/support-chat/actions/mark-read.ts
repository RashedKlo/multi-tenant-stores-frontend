
import { updateTag } from "next/cache";
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import { CACHE_TAGS } from "@/shared/config/cache";
import {
  markConversationReadSchema,
  type MarkConversationReadInput,
} from "../schemas/support-chat.schema";

export async function markConversationRead(
  input: MarkConversationReadInput,
): Promise<Result<void>> {
  const parsed = markConversationReadSchema.safeParse(input);

  if (!parsed.success) {
    return fail("errors.validation", parsed.error.flatten().fieldErrors);
  }

  const { conversationId } = parsed.data;

  const result = await fetchJson<void>(
    `/api/support/conversations/${conversationId}/read`,
    { method: "POST" },
  );

  if (result.success) {
    updateTag(CACHE_TAGS.supportMessages(conversationId));
    updateTag(CACHE_TAGS.supportConversations);
  }

  return result;
}