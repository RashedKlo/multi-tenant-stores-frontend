// app/(main)/chat/page.tsx
import { getTranslations } from "next-intl/server";
import { getAccessToken } from "@/shared/lib/http/token-storage";
import {
  getConversations,
  ChatShell,
  ConversationsLiveClient,
} from "@/features/support-chat";

/**
 * Server: load all conversations for the customer.
 * Client: open shared SupportChatHub for live list updates.
 */
export default async function ChatPage() {
  const t = await getTranslations("supportChat");
  const accessToken= await getAccessToken()??null;
  const conversations= await getConversations();

  return (
    <ChatShell title={t("listTitle")} subtitle={t("listSubtitle")}>
      <ConversationsLiveClient
        initial={conversations}
        accessToken={accessToken}
      />
    </ChatShell>
  );
}
