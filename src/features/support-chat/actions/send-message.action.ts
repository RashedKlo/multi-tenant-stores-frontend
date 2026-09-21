
"use server";

import { updateTag } from "next/cache";
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import { CACHE_TAGS } from "@/shared/config/cache";
import type { Message } from "../types";
import {
  sendMessageSchema,
  type SendMessageInput,
} from "../schemas/support-chat.schema";

export async function sendMessage(
  input: SendMessageInput,
): Promise<Result<Message>> {
  const parsed = sendMessageSchema.safeParse(input);

  if (!parsed.success) {
    return fail("errors.validation", parsed.error.flatten().fieldErrors);
  }

  const { conversationId, body } = parsed.data;

  const result = await fetchJson<Message>(
    `/api/support/conversations/${conversationId}/messages`,
    {
      method: "POST",
      body: { body },
    },
  );

  if (result.success) {
    updateTag(CACHE_TAGS.supportMessages(conversationId));
    updateTag(CACHE_TAGS.supportConversations);
  }

  return result;
}