// src/features/support-chat/components/sections/ChatThread/index.tsx
// Server Component — no "use client"
import { notFound } from "next/navigation";
import { getAccessToken } from "@/shared/lib/http/token-storage";
import { startConversation } from "../../../api/start-conversation";
import { getMessages } from "../../../api/get-messages";
import { ChatThreadClient } from "../../ChatThreadClient";
import { ChatThreadSkeleton } from "./skeleton";

const EMPTY_MESSAGES_PAGE = {
  items: [],
  pageNumber: 1,
  pageSize: 50,
  totalCount: 0,
  totalPages: 0,
  hasNextPage: false,
  hasPreviousPage: false,
};

interface ChatThreadProps {
  tenantId: string;
}

export async function ChatThread({ tenantId }: ChatThreadProps) {
  const accessToken = await getAccessToken();

  let conversation: Awaited<ReturnType<typeof startConversation>>;
  try {
    conversation = await startConversation(tenantId);
  } catch {
    notFound();
  }

  const messagesPage = await getMessages(conversation.id, 1, 50).catch(
    () => EMPTY_MESSAGES_PAGE,
  );

  return (
    <ChatThreadClient
      conversationId={conversation.id}
      tenantId={conversation.tenantId}
      tenantName={conversation.tenantName}
      initialMessages={messagesPage.items}
      accessToken={accessToken ?? null}
      customerId={conversation.customerId}
    />
  );
}

ChatThread.Skeleton = ChatThreadSkeleton;