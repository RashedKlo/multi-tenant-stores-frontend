// features/support-chat/api/start-conversation.ts
import { fetchJson, ApiError } from "@/shared/lib/http/fetch-json";
import { getAccessToken } from "@/shared/lib/http/token-storage";

/** Returns conversation id (idempotent for tenant + customer). */
export async function startConversation(tenantId: string): Promise<string> {
  const token = await getAccessToken();

  try {
    const id = await fetchJson<string>("/api/support/conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ tenantId }),
    });
    return id;
  } catch (error) {
    if (error instanceof ApiError) {
      console.error(`[startConversation] ${error.status}: ${error.message}`);
    }
    throw error;
  }
}
