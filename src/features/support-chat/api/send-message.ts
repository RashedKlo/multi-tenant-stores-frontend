// features/support-chat/api/send-message.ts
import { fetchJson, ApiError } from "@/shared/lib/http/fetch-json";
import { getAccessToken } from "@/shared/lib/http/token-storage";
import type { Message } from "../types";

export async function sendMessage(
  conversationId: string,
  body: string,
): Promise<Message> {
  const token = await getAccessToken();

  try {
    return await fetchJson<Message>(
      `/api/support/conversations/${conversationId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ body }),
      },
    );
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[sendMessage] ${error.status}: ${error.message}`);
    }
    throw error;
  }
}
