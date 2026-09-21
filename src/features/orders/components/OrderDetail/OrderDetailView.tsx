// features/orders/components/OrderDetailView.tsx
import Link from "next/link";
import type { OrderDetail } from "../../types";
import { OrderStatusBadge } from "../OrderStatusBadge";
import { formatDateTime, formatMoney, shortOrderId } from "../../lib/format";
import { resolveStatusName, isTerminalStatus } from "../../constants";

interface OrderDetailViewProps {
  order: OrderDetail;
  labels: {
    orderId: string;
    placedAt: string;
    delivery: string;
    items: string;
    subtotal: string;
    discount: string;
    total: string;
    history: string;
    track: string;
    back: string;
    qty: string;
  };
}

export function OrderDetailView({ order, labels }: OrderDetailViewProps) {
  const statusName = resolveStatusName(order.status);
  const canTrack = !isTerminalStatus(statusName);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs text-muted-foreground">
            {labels.orderId}: {shortOrderId(order.id)}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {labels.placedAt}: {formatDateTime(order.createdAt)}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </header>

      <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
        <h2 className="text-sm font-semibold text-foreground">
          {labels.delivery}
        </h2>
        <p className="mt-2 text-sm font-medium text-foreground">
          {order.deliveryName}
          {order.deliveryPhone ? ` · ${order.deliveryPhone}` : ""}
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          {order.deliveryAddressText}
        </p>
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
        <h2 className="mb-3 text-sm font-semibold text-foreground">
          {labels.items}
        </h2>
        <ul className="divide-y divide-border">
          {order.items.map((item) => (
            <li
              key={item.id}
              className="flex justify-between gap-3 py-3 first:pt-0 last:pb-0"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {item.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {labels.qty} {item.quantity}
                  {item.options.length > 0
                    ? ` · ${item.options.map((o) => o.name).join(", ")}`
                    : ""}
                </p>
              </div>
              <p className="shrink-0 text-sm font-semibold tabular-nums">
                {formatMoney(item.lineTotal)}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-4 space-y-1 border-t border-border pt-4 text-sm">
          <div className="flex justify-between text-muted-foreground">
            <span>{labels.subtotal}</span>
            <span className="tabular-nums">{formatMoney(order.subtotal)}</span>
          </div>
          {order.discountTotal > 0 && (
            <div className="flex justify-between text-muted-foreground">
              <span>{labels.discount}</span>
              <span className="tabular-nums">
                −{formatMoney(order.discountTotal)}
              </span>
            </div>
          )}
          <div className="flex justify-between font-bold text-foreground">
            <span>{labels.total}</span>
            <span className="tabular-nums">{formatMoney(order.total)}</span>
          </div>
        </div>
      </section>

      {order.statusHistory.length > 0 && (
        <section className="rounded-2xl border border-border bg-card p-4 sm:p-5">
          <h2 className="mb-3 text-sm font-semibold text-foreground">
            {labels.history}
          </h2>
          <ol className="space-y-3">
            {[...order.statusHistory]
              .sort(
                (a, b) =>
                  new Date(b.changedAt).getTime() -
                  new Date(a.changedAt).getTime(),
              )
              .map((h, i) => (
                <li key={`${h.changedAt}-${i}`} className="flex gap-3 text-sm">
                  <OrderStatusBadge status={h.status} />
                  <div className="min-w-0">
                    <p className="text-muted-foreground">
                      {formatDateTime(h.changedAt)}
                    </p>
                    {h.note && (
                      <p className="text-foreground">{h.note}</p>
                    )}
                  </div>
                </li>
              ))}
          </ol>
        </section>
      )}

      <div className="flex flex-col gap-3 sm:flex-row">
        {canTrack && (
          <Link
            href={`/orders/${order.id}/track`}
            className="inline-flex h-12 flex-1 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {labels.track}
          </Link>
        )}
        <Link
          href="/orders"
          className="inline-flex h-12 flex-1 items-center justify-center rounded-full border border-border bg-background text-sm font-medium text-foreground transition-colors hover:bg-muted"
        >
          {labels.back}
        </Link>
      </div>
    </div>
  );
}
