"use client";

import { useCallback, useState } from "react";
import type { ConversationSummary, Message } from "../../../types";
import { ConversationListItem } from "./ConversationListItem";
import { useSupportChatHub } from "../../../hooks/use-support-chat-hub";

interface ConversationsClientProps {
  initial: ConversationSummary[];
  accessToken?: string;
}

export function ConversationsClient({
  initial,
  accessToken,
}: ConversationsClientProps) {
  const [conversations, setConversations] = useState(initial);
  const onNewMessage = useCallback((msg: Message) => {
    setConversations((prev) => {
      const idx = prev.findIndex((c) => c.id === msg.conversationId);
      if (idx < 0) return prev;
      const updated = {
        ...prev[idx],
        lastMessageBody: msg.body,
        lastMessageAt: msg.createdAt,
        unreadCount: prev[idx].unreadCount + 1,
      };
      const rest = prev.filter((_, i) => i !== idx);
      return [updated, ...rest];
    });
  }, []);

  const onConversationDeleted = useCallback(
    (event: { conversationId: string }) => {
      setConversations((prev) => prev.filter((c) => c.id !== event.conversationId));
    },
    [],
  );

  useSupportChatHub({
    accessToken: accessToken ?? null,
    enabled: Boolean(accessToken),
    onNewMessage,
    onConversationDeleted,
  });

  return (
    <ul className="space-y-2">
      {conversations.map((conversation) => (
        <li key={conversation.id}>
          <ConversationListItem conversation={conversation} />
        </li>
      ))}
    </ul>
  );
}