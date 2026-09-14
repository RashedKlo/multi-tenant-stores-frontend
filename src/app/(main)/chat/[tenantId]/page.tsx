// app/(main)/chat/[tenantId]/page.tsx
import { notFound } from "next/navigation";
import { getAccessToken } from "@/shared/lib/http/token-storage";
import {
  startConversation,
  getMessages,
  getConversations,
  ChatShell,
  ChatThreadClient,
} from "@/features/support-chat";

interface ChatTenantPageProps {
  params: Promise<{ tenantId: string }>;
}

/**
 * Nested route: /chat/{tenantId}
 * 1. Ensure conversation exists (POST start — idempotent)
 * 2. Load messages
 * 3. Client connects SignalR and handles send/receive
 */
export default async function ChatTenantPage({ params }: ChatTenantPageProps) {
  const { tenantId } = await params;
  if (!tenantId) notFound();

  const accessToken = await getAccessToken();

  let conversationId: string;
  try {
    conversationId = await startConversation(tenantId);
  } catch {
    notFound();
  }

  const [messagesPage, conversations] = await Promise.all([
    getMessages(conversationId, 1, 50).catch(() => ({
      items: [],
      pageNumber: 1,
      pageSize: 50,
      totalCount: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    })),
    getConversations().catch(() => []),
  ]);

  const summary = conversations.find(
    (c) => c.tenantId === tenantId || c.id === conversationId,
  );
  const tenantName = summary?.tenantName ?? "Support";

  // Optional: decode customer id from JWT elsewhere; null is fine for isOwn heuristic
  const customerId: string | null = null;

  return (
    <ChatShell flush>
      <ChatThreadClient
        conversationId={conversationId}
        tenantId={tenantId}
        tenantName={tenantName}
        initialMessages={messagesPage.items}
        accessToken={accessToken}
        customerId={customerId}
      />
    </ChatShell>
  );
}
