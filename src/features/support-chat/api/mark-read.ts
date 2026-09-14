// features/support-chat/api/mark-read.ts
import { fetchJson, ApiError } from "@/shared/lib/http/fetch-json";
import { getAccessToken } from "@/shared/lib/http/token-storage";

export async function markConversationRead(
  conversationId: string,
): Promise<void> {
  const token = await getAccessToken();

  try {
    await fetchJson(`/api/support/conversations/${conversationId}/read`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      allowEmptyResponse: true,
    });
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[markConversationRead] ${error.status}: ${error.message}`);
    }
    // Non-fatal for UX
  }
}
