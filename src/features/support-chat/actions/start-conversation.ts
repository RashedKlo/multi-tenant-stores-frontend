

import { updateTag } from "next/cache";
import { fetchJson } from "@/shared/lib/http/fetch-json";
import { fail, type Result } from "@/shared/lib/result";
import { CACHE_TAGS } from "@/shared/config/cache";
import type { Conversation } from "../types";
import {
  startConversationSchema,
  type StartConversationInput,
} from "../schemas/support-chat.schema";

export async function startConversation(
  input: StartConversationInput,
): Promise<Result<Conversation>> {
  const parsed = startConversationSchema.safeParse(input);

  if (!parsed.success) {
    return fail("errors.validation", parsed.error.flatten().fieldErrors);
  }

  const result = await fetchJson<Conversation>("/api/support/conversations", {
    method: "POST",
    body: { tenantId: parsed.data.tenantId },
  });

  if (result.success) {
    updateTag(CACHE_TAGS.supportConversations);
  }

  return result;
}