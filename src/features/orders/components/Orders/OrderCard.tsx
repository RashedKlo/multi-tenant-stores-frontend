// features/orders/components/OrderCard.tsx
import Link from "next/link";
import type { OrderSummary } from "../../types";
import { OrderStatusBadge } from "../OrderStatusBadge";
import { formatDateTime, formatMoney, shortOrderId } from "../../lib/format";
import { resolveStatusName, isTerminalStatus } from "../../constants";

interface OrderCardProps {
  order: OrderSummary;
  labels: {
    total: string;
    track: string;
    view: string;
  };
}

export function OrderCard({ order, labels }: OrderCardProps) {
  const statusName = resolveStatusName(order.status);
  const canTrack = !isTerminalStatus(statusName);

  return (
    <article className="rounded-2xl border border-border bg-card p-4 shadow-sm transition-colors hover:bg-muted/30 sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 space-y-1">
          <p className="font-mono text-xs text-muted-foreground">
            #{shortOrderId(order.id)}
          </p>
          <p className="text-sm text-muted-foreground">
            {formatDateTime(order.createdAt)}
          </p>
        </div>
        <OrderStatusBadge status={order.status} />
      </div>

      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <div>
          <p className="text-xs text-muted-foreground">{labels.total}</p>
          <p className="text-base font-bold tabular-nums text-foreground">
            {formatMoney(order.total)}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Link
            href={`/orders/${order.id}`}
            className="inline-flex h-10 items-center justify-center rounded-full border border-border bg-background px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            {labels.view}
          </Link>
          {canTrack && (
            <Link
              href={`/orders/${order.id}/track`}
              className="inline-flex h-10 items-center justify-center rounded-full bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {labels.track}
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
