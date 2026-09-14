"use client";

// features/support-chat/components/ChatThreadClient.tsx
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { Message } from "../types";
import { useSupportChatHub } from "../hooks/use-support-chat-hub";
import { MessageBubble } from "./MessageBubble";
import { ChatComposer } from "./ChatComposer";
import { SENDER_CUSTOMER } from "../constants";
// import { markConversationRead } from "../api/mark-read";

interface ChatThreadClientProps {
  conversationId: string;
  tenantId: string;
  tenantName: string;
  initialMessages: Message[];
  accessToken: string | null;
  /** Current customer id — to detect "own" messages */
  customerId: string | null;
}

export function ChatThreadClient({
  conversationId,
  tenantId,
  tenantName,
  initialMessages,
  accessToken,
  customerId,
}: ChatThreadClientProps) {
  const t = useTranslations("supportChat");
  const bottomRef = useRef<HTMLDivElement>(null);

  // API returns newest-first; display oldest-first
  const [messages, setMessages] = useState<Message[]>(() =>
    [...initialMessages].sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
    ),
  );
  const [error, setError] = useState<string | null>(null);

  const scrollToBottom = useCallback((smooth = true) => {
    bottomRef.current?.scrollIntoView({
      behavior: smooth ? "smooth" : "instant",
    });
  }, []);

  useEffect(() => {
    scrollToBottom(false);
  }, [scrollToBottom]);

  useEffect(() => {
    scrollToBottom(true);
  }, [messages.length, scrollToBottom]);

  // Mark as read once when thread opens
  useEffect(() => {
    // void markConversationRead(conversationId);
  }, [conversationId]);

  const onNewMessage = useCallback(
    (msg: Message) => {
      if (msg.conversationId !== conversationId) return;
      setMessages((prev) => {
        if (prev.some((m) => m.id === msg.id)) return prev;
        // Replace optimistic temp messages with same body
        const withoutTemp = prev.filter(
          (m) =>
            !(
              m.id.startsWith("temp-") &&
              m.body === msg.body &&
              m.senderType === SENDER_CUSTOMER
            ),
        );
        return [...withoutTemp, msg].sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
      });
      // void markConversationRead(conversationId);
    },
    [conversationId],
  );

  const onMessageDeleted = useCallback(
    (event: { conversationId: string; messageId: string }) => {
      if (event.conversationId !== conversationId) return;
      setMessages((prev) => prev.filter((m) => m.id !== event.messageId));
    },
    [conversationId],
  );

  const { hubState } = useSupportChatHub({
    accessToken,
    enabled: Boolean(accessToken),
    onNewMessage,
    onMessageDeleted,
  });

  const connectionHint =
    hubState === "connected"
      ? t("live")
      : hubState === "connecting" || hubState === "reconnecting"
        ? t("connecting")
        : hubState === "error"
          ? t("offline")
          : "";

  const isOwn = useCallback(
    (m: Message) => {
      if (m.senderType === SENDER_CUSTOMER) {
        if (customerId && m.senderId === customerId) return true;
        if (m.senderId === "me") return true;
        // Fallback: treat Customer sender as own for this customer app
        return true;
      }
      return false;
    },
    [customerId],
  );

  const list = useMemo(() => messages, [messages]);

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/80">
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
            {tenantName}
          </p>
          {connectionHint && (
            <p className="text-[11px] text-muted-foreground">{connectionHint}</p>
          )}
        </div>
      </header>

      <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
        {list.length === 0 && (
          <p className="py-12 text-center text-sm text-muted-foreground">
            {t("emptyThread")}
          </p>
        )}
        {list.map((m) => (
          <MessageBubble key={m.id} message={m} isOwn={isOwn(m)} />
        ))}
        <div ref={bottomRef} />
      </div>

      {error && (
        <p className="px-4 pb-1 text-center text-xs text-destructive">{error}</p>
      )}

      <ChatComposer
        conversationId={conversationId}
        onOptimistic={(temp) => {
          setError(null);
          setMessages((prev) => [...prev, temp]);
        }}
        onSent={(msg) => {
          setMessages((prev) => {
            const withoutTemp = prev.filter((m) => !m.id.startsWith("temp-"));
            if (withoutTemp.some((m) => m.id === msg.id)) return withoutTemp;
            return [...withoutTemp, msg].sort(
              (a, b) =>
                new Date(a.createdAt).getTime() -
                new Date(b.createdAt).getTime(),
            );
          });
        }}
        onError={setError}
      />
    </div>
  );
}
