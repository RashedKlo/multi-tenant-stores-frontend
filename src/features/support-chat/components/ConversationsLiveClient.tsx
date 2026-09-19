"use client";

// features/support-chat/components/ConversationsLiveClient.tsx
import { useCallback, useState } from "react";
import type { ConversationSummary, Message } from "../types";
import { ConversationListItem } from "./ConversationListItem";
import { ConversationsEmpty } from "./ConversationsEmpty";
import { useSupportChatHub } from "../hooks/use-support-chat-hub";
import { useTranslations } from "next-intl";

interface ConversationsLiveClientProps {
  initial: ConversationSummary[];
  accessToken?: string;
}

/**
 * List is SSR'd; this client layer keeps unread/last message in sync via SignalR.
 */
export function ConversationsLiveClient({
  initial,
  accessToken,
}: ConversationsLiveClientProps) {
  const t = useTranslations("supportChat");
  const [items, setItems] = useState(initial);

  const onNewMessage = useCallback((msg: Message) => {
    setItems((prev) => {
      const idx = prev.findIndex((c) => c.id === msg.conversationId);
      if (idx < 0) return prev;
      const updated = {
        ...prev[idx],
        lastMessageBody: msg.body,
        lastMessageAt: msg.createdAt,
        unreadCount:
          msg.senderType === "Customer"
            ? prev[idx].unreadCount
            : prev[idx].unreadCount + 1,
      };
      const rest = prev.filter((_, i) => i !== idx);
      return [updated, ...rest];
    });
  }, []);

  const onConversationDeleted = useCallback(
    (event: { conversationId: string }) => {
      setItems((prev) => prev.filter((c) => c.id !== event.conversationId));
    },
    [],
  );

  useSupportChatHub({
    accessToken: accessToken ?? null,
    enabled: Boolean(accessToken),
    onNewMessage,
    onConversationDeleted,
  });

  if (items.length === 0) {
    return (
      <ConversationsEmpty
        title={t("emptyTitle")}
        description={t("emptyDescription")}
        ctaLabel={t("emptyCta")}
        href="/home"
      />
    );
  }

  return (
    <ul className="space-y-2">
      {items.map((c) => (
        <li key={c.id}>
          <ConversationListItem conversation={c} />
        </li>
      ))}
    </ul>
  );
}
