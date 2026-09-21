"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { Conversation, Message } from "../../../types";
import { useSupportChatHub } from "../../../hooks/use-support-chat-hub";
import { MessageBubble } from "./MessageBubble";
import { ChatComposer } from "./ChatComposer";
import { SENDER_CUSTOMER } from "../../../constants";
import { Notification } from "@/shared/lib/ui";

interface ChatThreadClientProps {
  conversation:Conversation;
  initialMessages: Message[];
  accessToken: string | null;
}

export function ChatThreadClient({
  conversation,
  initialMessages,
  accessToken,
}: ChatThreadClientProps) {
  const t = useTranslations("supportChat");
  const bottomRef = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [error, setError] = useState<string | null>(null);

  const scrollToBottom = useCallback((smooth = true) => {
    bottomRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "instant",
    });
  }, []);   

  useEffect(() => {
    scrollToBottom(false);
  }, [scrollToBottom]);

  const onNewMessage = useCallback(
  (msg: Message) => {
    if (msg.conversationId !== conversation.id) return;

    setMessages((prev) => {

      return [...prev, msg];
    });
  },
  [conversation.id],
);

  const onMessageDeleted = useCallback(
    (event: { conversationId: string; messageId: string }) => {
      if (event.conversationId !== conversation.id) return;
      setMessages((prev) => prev.filter((m) => m.id !== event.messageId));
    },
    [conversation.id],
  );

  const {  } = useSupportChatHub({
    accessToken,
    enabled: Boolean(accessToken),
    onNewMessage,
    onMessageDeleted,
  });



  const isOwn = useCallback(
    (message: Message) => {
      if (message.senderType === SENDER_CUSTOMER) {
        if (conversation.customerId && message.senderId === conversation.customerId) return true;
        return true;
      } 
      return false;
    },
    [conversation.customerId],
  );

  const list = useMemo(() => messages, [messages]);

  return (
    <>
      {error && (
        <Notification message={error} variant="error" onDismiss={() => setError(null)} />
      )}
       <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur supports-backdrop-filter:bg-background/80">
        <Link
          href="/chat"
          className="flex h-9 w-9 items-center justify-center rounded-full text-foreground hover:bg-muted"
          aria-label={t("back")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="h-5 w-5 rtl:rotate-180"
            aria-hidden
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </Link>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">
            {conversation.tenantName }
          </p>
         
        </div>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {list.length === 0 && (
          <p className="py-12 text-center text-sm text-muted-foreground">
            {t("emptyThread")}
          </p>
        )}
        {list.map((message) => (
          <MessageBubble key={message.id} message={message} isOwn={isOwn(message)} />
        ))}
        <div ref={bottomRef} />
      </div>

      <ChatComposer
        conversationId={conversation.id}
        onOptimistic={(temp) => {
          setError(null);
          setMessages((prev) => [...prev, temp]);
        }}
        onSent={(message) => {
          setMessages((prev) => prev.map((m) => (m.id.startsWith("temp-") ? message : m)));
        }}
        onError={setError}
      />
    </div>
    </>
  );
}