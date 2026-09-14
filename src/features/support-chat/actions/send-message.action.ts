"use server";

// features/support-chat/actions/send-message.action.ts
import { sendMessage } from "../api/send-message";
import type { Message } from "../types";
import { ApiError } from "@/shared/lib/http/fetch-json";

export type SendMessageResult =
  | { success: true; data: Message }
  | { success: false; error: string };

export async function sendMessageAction(
  conversationId: string,
  body: string,
): Promise<SendMessageResult> {
  const trimmed = body?.trim() ?? "";
  if (!conversationId || !trimmed) {
    return { success: false, error: "Message cannot be empty." };
  }
  if (trimmed.length > 2000) {
    return { success: false, error: "Message is too long." };
  }

  try {
    const data = await sendMessage(conversationId, trimmed);
    return { success: true, data };
  } catch (error) {
    if (error instanceof ApiError) {
      return { success: false, error: error.message };
    }
    return { success: false, error: "Failed to send message." };
  }
}
