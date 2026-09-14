// features/orders/hooks/use-order-tracking.ts
"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { HubConnection } from "@microsoft/signalr";
import { hubConnectionManager } from "@/shared/lib/signalr/hub-connection-manager";
import type { OrderStatusChangedEvent, TrackingConnectionState } from "../types";
import { resolveStatusName } from "../constants";

const HUB_PATH = "/hubs/order-tracking";
const EVENT_NAME = "OrderStatusChanged";


interface UseOrderTrackingOptions {
  orderId: string;
  onStatusChanged?: (event: OrderStatusChangedEvent) => void;
}

interface UseOrderTrackingResult {
  connectionState: TrackingConnectionState;
  lastEvent: OrderStatusChangedEvent | null;
  /** Opens the shared hub connection. No-op if already connected/connecting. */
  connect: (accessToken: string) => Promise<void>;
  /** Releases this subscriber's hold on the shared connection. */
  disconnect: () => void;
}

/**
 * Subscribes to OrderTrackingHub's OrderStatusChanged event for one order.
 *
 * The connection lifecycle is fully caller-driven: nothing happens until
 * `connect(accessToken)` is invoked (typically from a "Start live tracking"
 * click). The underlying HubConnection is owned by `hubConnectionManager`
 * and shared across every order screen the user opens, so tracking a
 * second order never opens a second socket.
 */
export function useOrderTracking({
  orderId,
  onStatusChanged,
}: UseOrderTrackingOptions): UseOrderTrackingResult {
  const [connectionState, setConnectionState] =
    useState<TrackingConnectionState>("idle");
  const [lastEvent, setLastEvent] = useState<OrderStatusChangedEvent | null>(
    null,
  );

  const connectionRef = useRef<HubConnection | null>(null);
  const tokenRef = useRef<string | null>(null);
  const handlerRef = useRef<((payload: OrderStatusChangedEvent) => void) | null>(null);
  const isConnectingRef = useRef(false);
  // signalR gives no way to remove a single onclose/onreconnecting/
  // onreconnected callback individually — since the connection outlives
  // this hook instance, we gate those callbacks with this flag instead so
  // they become no-ops once we've detached.
  const activeRef = useRef(false);
  const onStatusChangedRef = useRef(onStatusChanged);
  onStatusChangedRef.current = onStatusChanged;

  const disconnect = useCallback(() => {
    activeRef.current = false;

    const connection = connectionRef.current;
    if (connection && handlerRef.current) {
      connection.off(EVENT_NAME, handlerRef.current);
    }
    handlerRef.current = null;
    connectionRef.current = null;

    if (tokenRef.current) {
      hubConnectionManager.release(HUB_PATH, tokenRef.current);
      tokenRef.current = null;
    }
    setConnectionState("idle");
  }, []);

  const connect = useCallback(
    async (accessToken: string) => {
      if (!accessToken || connectionRef.current || isConnectingRef.current) {
        return;
      }

      isConnectingRef.current = true;
      setConnectionState("connecting");

      try {
        const connection = await hubConnectionManager.acquire(
          HUB_PATH,
          accessToken,
        );

        activeRef.current = true;
        connectionRef.current = connection;
        tokenRef.current = accessToken;

        const handler = (payload: OrderStatusChangedEvent) => {
          if (!activeRef.current) return;
          if (
            payload?.orderId &&
            payload.orderId.toLowerCase() !== orderId.toLowerCase()
          ) {
            return; // event for a different order on the same shared connection
          }
          const normalized: OrderStatusChangedEvent = {
            orderId: payload.orderId,
            status: resolveStatusName(payload.status),
            note: payload.note ?? null,
            changedAt: payload.changedAt ?? new Date().toISOString(),
          };
          setLastEvent(normalized);
          onStatusChangedRef.current?.(normalized);
        };
        handlerRef.current = handler;
        connection.on(EVENT_NAME, handler);

        connection.onreconnecting(() => {
          if (activeRef.current) setConnectionState("reconnecting");
        });
        connection.onreconnected(() => {
          if (activeRef.current) setConnectionState("connected");
        });
        connection.onclose(() => {
          if (activeRef.current) setConnectionState("disconnected");
        });

        setConnectionState("connected");
      } catch (err) {
        console.error("[useOrderTracking] connect failed", err);
        hubConnectionManager.release(HUB_PATH, accessToken);
        setConnectionState("error");
      } finally {
        isConnectingRef.current = false;
      }
    },
    [orderId],
  );

  // Always release our hold on the shared connection on unmount, even if
  // the caller never explicitly called disconnect().
  useEffect(() => {
    return () => disconnect();
  }, [disconnect]);

  return { connectionState, lastEvent, connect, disconnect };
}