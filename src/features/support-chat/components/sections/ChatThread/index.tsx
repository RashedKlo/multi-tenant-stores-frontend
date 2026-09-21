
import { getAccessToken } from "@/shared/lib/http/token-storage";
import { startConversation } from "../../../actions/start-conversation";
import { getMessages } from "../../../api/get-messages";
import { ChatThreadClient } from "./ChatThreadClient";
import { ChatEmpty } from "./empty";
import { ChatThreadSkeleton } from "./skeleton";
interface ChatThreadProps {
  tenantId: string;
}

export async function ChatThread({ tenantId }: ChatThreadProps) {
  const accessToken = await getAccessToken();
  const conversation = await startConversation({ tenantId });
  if(!conversation.success)
  {
    return <ChatEmpty/>
  }
  const messagesPage = await getMessages({
    conversationId: conversation.data.id,
    page: 1,
    pageSize: 20,
  });
  if (!messagesPage.success) {
    return <ChatEmpty />;
  }

  return (
    <ChatThreadClient
      conversation={conversation.data}
      initialMessages={messagesPage.data.items}
      accessToken={accessToken ??null}
    />
  );
}

ChatThread.Skeleton = ChatThreadSkeleton;

export { ChatThreadSkeleton };