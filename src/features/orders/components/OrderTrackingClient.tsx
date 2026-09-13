"use client";

// features/orders/components/OrderTrackingClient.tsx
import { useCallback, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { OrderDetail, OrderStatusChangedEvent } from "../types";
import { useOrderTracking } from "../hooks/use-order-tracking";
import { OrderTrackingTimeline } from "./OrderTrackingTimeline";
import { OrderStatusBadge } from "./OrderStatusBadge";
import { resolveStatusName, isTerminalStatus } from "../constants";
import { formatDateTime, shortOrderId } from "../lib/format";

interface OrderTrackingClientProps {
  order: OrderDetail;
  /** Client-readable access token for SignalR */
  accessToken: string | null;
}

export function OrderTrackingClient({
  order: initialOrder,
  accessToken,
}: OrderTrackingClientProps) {
  const t = useTranslations("orders");
  const [status, setStatus] = useState(initialOrder.status);
  const [history, setHistory] = useState(initialOrder.statusHistory);
  const [liveNote, setLiveNote] = useState<string | null>(null);

  const statusName = resolveStatusName(status);
  const terminal = isTerminalStatus(statusName);

  const onStatusChanged = useCallback((event: OrderStatusChangedEvent) => {
    setStatus(event.status);
    setLiveNote(event.note);
    setHistory((prev) => [
      {
        status: event.status,
        note: event.note,
        changedAt: event.changedAt,
      },
      ...prev,
    ]);
  }, []);

  const { connectionState } = useOrderTracking({
    orderId: initialOrder.id,
    accessToken,
    enabled: Boolean(accessToken) && !terminal,
    onStatusChanged,
  });

  const connectionLabel =
    connectionState === "connected"
      ? t("liveConnected")
      : connectionState === "connecting" || connectionState === "reconnecting"
        ? t("liveConnecting")
        : connectionState === "error"
          ? t("liveError")
          : t("liveOffline");

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-mono text-xs text-muted-foreground">
            #{shortOrderId(initialOrder.id)}
          </p>
          <OrderStatusBadge status={status} />
        </div>
        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {t("trackTitle")}
        </h1>
        <p className="text-sm text-muted-foreground">
          {t("trackSubtitle")}
        </p>
        {!terminal && (
          <p className="text-xs text-muted-foreground">
            <span
              className={
                connectionState === "connected"
                  ? "text-emerald-600 dark:text-emerald-400"
                  : ""
              }
            >
              {connectionLabel}
            </span>
            {liveNote ? ` · ${liveNote}` : ""}
          </p>
        )}
      </header>

      <section className="rounded-2xl border border-border bg-card p-4 sm:p-6">
        <OrderTrackingTimeline
          currentStatus={status}
          history={history}
          cancelledLabel={t("cancelledBanner")}
          liveLabel={
            connectionState === "connected" ? t("liveBadge") : undefined
          }
        />
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 text-sm sm:p-5">
        <p className="font-medium text-foreground">
          {initialOrder.deliveryName}
        </p>
        <p className="mt-1 text-muted-foreground">
          {initialOrder.deliveryAddressText}
        </p>
        <p className="mt-2 text-xs text-muted-foreground">
          {t("updatedAt")}: {formatDateTime(initialOrder.updatedAt)}
        </p>
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Link
          href={`/orders/${initialOrder.id}`}
          className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-border bg-background text-sm font-medium transition-colors hover:bg-muted"
        >
          {t("viewDetails")}
        </Link>
        <Link
          href="/orders"
          className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          {t("allOrders")}
        </Link>
      </div>
    </div>
  );
}
