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
  // Real connection state — only ever set from async callbacks
  // (promise .then/.catch, SignalR event handlers), never synchronously
  // in the effect body.
  const [connectionState, setConnectionState] = useState<HubState>("idle");

  // Publicly exposed state is derived: when disabled/no token, it's
  // always "idle" regardless of whatever connectionState holds from a
  // previous session, so we never need to setState on bail-out.
  const hubState: HubState = enabled && accessToken ? connectionState : "idle";

  const handlersRef = useRef({
    onNewMessage,
    onMessagesRead,
    onMessageDeleted,
    onConversationDeleted,
  });

  // Sync the ref after render/commit instead of mutating it during render.
  useEffect(() => {
    handlersRef.current = {
      onNewMessage,
      onMessagesRead,
      onMessageDeleted,
      onConversationDeleted,
    };
  });

  useEffect(() => {
    if (!enabled || !accessToken) {
      // No setState here — `hubState` above already derives to "idle"
      // whenever disabled or there's no token.
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

      Promise.resolve()
    .then(() => {
      if (cancelled) return null;
      setConnectionState("connecting");
      return hubConnectionManager.acquire(SUPPORT_CHAT_HUB_PATH, accessToken);
    })
    .then((conn) => {
      if (!conn || cancelled) {
        if (conn) {
          hubConnectionManager.release(SUPPORT_CHAT_HUB_PATH, accessToken);
        }
        return;
      }
      connection = conn;

        conn.on(SUPPORT_EVENTS.NewMessage, onNew);
        conn.on(SUPPORT_EVENTS.MessagesRead, onRead);
        conn.on(SUPPORT_EVENTS.MessageDeleted, onDelMsg);
        conn.on(SUPPORT_EVENTS.ConversationDeleted, onDelConv);

        conn.onreconnecting(() => {
          if (!cancelled) setConnectionState("reconnecting");
        });
        conn.onreconnected(() => {
          if (!cancelled) setConnectionState("connected");
        });
        conn.onclose(() => {
          if (!cancelled) setConnectionState("disconnected");
        });

        setConnectionState("connected");
      })
      .catch((err) => {
        console.error("[useSupportChatHub]", err);
        if (!cancelled) setConnectionState("error");
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