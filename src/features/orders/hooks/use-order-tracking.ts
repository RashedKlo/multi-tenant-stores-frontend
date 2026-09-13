"use client";

// features/orders/hooks/use-order-tracking.ts
import { useCallback, useEffect, useRef, useState } from "react";
import type { HubConnection } from "@microsoft/signalr";
import { createHubConnection } from "@/shared/lib/signalr/create-hub-connection";
import type { OrderStatusChangedEvent } from "../types";
import { resolveStatusName } from "../constants";

const HUB_PATH = "/hubs/order-tracking";
const EVENT_NAME = "OrderStatusChanged";

export type TrackingConnectionState =
  | "idle"
  | "connecting"
  | "connected"
  | "reconnecting"
  | "disconnected"
  | "error";

interface UseOrderTrackingOptions {
  orderId: string;
  /** JWT access token — required for hub auth */
  accessToken: string | null;
  /** When false, do not connect (e.g. order still loading) */
  enabled?: boolean;
  onStatusChanged?: (event: OrderStatusChangedEvent) => void;
}

/**
 * Connects to OrderTrackingHub after order is known.
 * Listens for OrderStatusChanged targeted at the authenticated customer.
 */
export function useOrderTracking({
  orderId,
  accessToken,
  enabled = true,
  onStatusChanged,
}: UseOrderTrackingOptions) {
  const [connectionState, setConnectionState] =
    useState<TrackingConnectionState>("idle");
  const [lastEvent, setLastEvent] = useState<OrderStatusChangedEvent | null>(
    null,
  );
  const connectionRef = useRef<HubConnection | null>(null);
  const onStatusChangedRef = useRef(onStatusChanged);
  onStatusChangedRef.current = onStatusChanged;

  const disconnect = useCallback(async () => {
    const conn = connectionRef.current;
    connectionRef.current = null;
    if (conn) {
      try {
        await conn.stop();
      } catch {
        // ignore
      }
    }
    setConnectionState("disconnected");
  }, []);

  useEffect(() => {
    if (!enabled || !orderId || !accessToken) {
      return;
    }

    let cancelled = false;
    const connection = createHubConnection(HUB_PATH, accessToken);
    connectionRef.current = connection;

    connection.on(EVENT_NAME, (payload: OrderStatusChangedEvent) => {
      if (cancelled) return;
      // Only apply events for this order
      if (
        payload?.orderId &&
        payload.orderId.toLowerCase() !== orderId.toLowerCase()
      ) {
        return;
      }
      const normalized: OrderStatusChangedEvent = {
        orderId: payload.orderId,
        status: resolveStatusName(payload.status),
        note: payload.note ?? null,
        changedAt: payload.changedAt ?? new Date().toISOString(),
      };
      setLastEvent(normalized);
      onStatusChangedRef.current?.(normalized);
    });

    connection.onreconnecting(() => {
      if (!cancelled) setConnectionState("reconnecting");
    });
    connection.onreconnected(() => {
      if (!cancelled) setConnectionState("connected");
    });
    connection.onclose(() => {
      if (!cancelled) setConnectionState("disconnected");
    });

    setConnectionState("connecting");
    connection
      .start()
      .then(() => {
        if (!cancelled) setConnectionState("connected");
      })
      .catch((err) => {
        console.error("[useOrderTracking] start failed", err);
        if (!cancelled) setConnectionState("error");
      });

    return () => {
      cancelled = true;
      connection.off(EVENT_NAME);
      connection.stop().catch(() => undefined);
      connectionRef.current = null;
    };
  }, [orderId, accessToken, enabled]);

  return {
    connectionState,
    lastEvent,
    disconnect,
  };
}
