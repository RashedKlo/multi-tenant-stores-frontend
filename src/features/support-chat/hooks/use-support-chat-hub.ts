"use client";

// features/support-chat/hooks/use-support-chat-hub.ts
import { useEffect, useRef, useState } from "react";
import type { HubConnection } from "@microsoft/signalr";
import { hubConnectionManager } from "@/shared/lib/signalr/hub-connection-manager";
import { SUPPORT_CHAT_HUB_PATH, SUPPORT_EVENTS } from "../constants";
import type {
  ConversationDeletedEvent,
  MessageDeletedEvent,
  MessagesReadEvent,
  NewMessageEvent,
} from "../types";

export type HubState =
  | "idle"
  | "connecting"
  | "connected"
  | "reconnecting"
  | "disconnected"
  | "error";

interface UseSupportChatHubOptions {
  accessToken: string | null;
  enabled?: boolean;
  onNewMessage?: (message: NewMessageEvent) => void;
  onMessagesRead?: (event: MessagesReadEvent) => void;
  onMessageDeleted?: (event: MessageDeletedEvent) => void;
  onConversationDeleted?: (event: ConversationDeletedEvent) => void;
}

/**
 * Acquires shared SupportChatHub via hubConnectionManager.
 * Registers event handlers; cleans up on unmount / token change.
 */
export function useSupportChatHub({
  accessToken,
  enabled = true,
  onNewMessage,
  onMessagesRead,
  onMessageDeleted,
  onConversationDeleted,
}: UseSupportChatHubOptions) {
  const [hubState, setHubState] = useState<HubState>("idle");
  const handlersRef = useRef({
    onNewMessage,
    onMessagesRead,
    onMessageDeleted,
    onConversationDeleted,
  });
  handlersRef.current = {
    onNewMessage,
    onMessagesRead,
    onMessageDeleted,
    onConversationDeleted,
  };

  useEffect(() => {
    if (!enabled || !accessToken) {
      setHubState("idle");
      return;
    }

    let cancelled = false;
    let connection: HubConnection | null = null;

    const onNew = (msg: NewMessageEvent) =>
      handlersRef.current.onNewMessage?.(msg);
    const onRead = (e: MessagesReadEvent) =>
      handlersRef.current.onMessagesRead?.(e);
    const onDelMsg = (e: MessageDeletedEvent) =>
      handlersRef.current.onMessageDeleted?.(e);
    const onDelConv = (e: ConversationDeletedEvent) =>
      handlersRef.current.onConversationDeleted?.(e);

    setHubState("connecting");

    hubConnectionManager
      .acquire(SUPPORT_CHAT_HUB_PATH, accessToken)
      .then((conn) => {
        if (cancelled) {
          hubConnectionManager.release(SUPPORT_CHAT_HUB_PATH, accessToken);
          return;
        }
        connection = conn;

        conn.on(SUPPORT_EVENTS.NewMessage, onNew);
        conn.on(SUPPORT_EVENTS.MessagesRead, onRead);
        conn.on(SUPPORT_EVENTS.MessageDeleted, onDelMsg);
        conn.on(SUPPORT_EVENTS.ConversationDeleted, onDelConv);

        conn.onreconnecting(() => {
          if (!cancelled) setHubState("reconnecting");
        });
        conn.onreconnected(() => {
          if (!cancelled) setHubState("connected");
        });
        conn.onclose(() => {
          if (!cancelled) setHubState("disconnected");
        });

        setHubState("connected");
      })
      .catch((err) => {
        console.error("[useSupportChatHub]", err);
        if (!cancelled) setHubState("error");
      });

    return () => {
      cancelled = true;
      if (connection) {
        connection.off(SUPPORT_EVENTS.NewMessage, onNew);
        connection.off(SUPPORT_EVENTS.MessagesRead, onRead);
        connection.off(SUPPORT_EVENTS.MessageDeleted, onDelMsg);
        connection.off(SUPPORT_EVENTS.ConversationDeleted, onDelConv);
      }
      hubConnectionManager.release(SUPPORT_CHAT_HUB_PATH, accessToken);
    };
  }, [accessToken, enabled]);

  return { hubState };
}
