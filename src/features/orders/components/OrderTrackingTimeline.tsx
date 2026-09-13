"use client";

// features/orders/components/OrderTrackingTimeline.tsx
import { TRACKING_STEPS, resolveStatusName } from "../constants";
import type { OrderStatusHistoryItem, OrderStatusName } from "../types";
import { formatDateTime } from "../lib/format";

interface OrderTrackingTimelineProps {
  currentStatus: number | string;
  history: OrderStatusHistoryItem[];
  cancelledLabel: string;
  liveLabel?: string;
}

function stepIndex(name: OrderStatusName): number {
  return TRACKING_STEPS.indexOf(name);
}

export function OrderTrackingTimeline({
  currentStatus,
  history,
  cancelledLabel,
  liveLabel,
}: OrderTrackingTimelineProps) {
  const currentName = resolveStatusName(currentStatus);
  const isCancelled = currentName === "Cancelled";
  const currentIdx = stepIndex(currentName);

  const historyByStatus = new Map<string, OrderStatusHistoryItem>();
  for (const h of history) {
    const name = resolveStatusName(h.status);
    const existing = historyByStatus.get(name);
    if (
      !existing ||
      new Date(h.changedAt) > new Date(existing.changedAt)
    ) {
      historyByStatus.set(name, h);
    }
  }

  if (isCancelled) {
    return (
      <div className="rounded-2xl border border-rose-500/30 bg-rose-500/10 p-5 text-center">
        <p className="text-sm font-semibold text-rose-700 dark:text-rose-400">
          {cancelledLabel}
        </p>
        {history[0] && (
          <p className="mt-1 text-xs text-muted-foreground">
            {formatDateTime(history[0].changedAt)}
            {history[0].note ? ` · ${history[0].note}` : ""}
          </p>
        )}
      </div>
    );
  }

  return (
    <ol className="relative space-y-0">
      {TRACKING_STEPS.map((step, index) => {
        const done = currentIdx > index;
        const active = currentIdx === index;
        const hist = historyByStatus.get(step);

        return (
          <li key={step} className="relative flex gap-4 pb-8 last:pb-0">
            {index < TRACKING_STEPS.length - 1 && (
              <span
                className={`absolute start-3.5 top-8 h-[calc(100%-2rem)] w-0.5 ${
                  done ? "bg-primary" : "bg-border"
                }`}
                aria-hidden
              />
            )}

            <span
              className={`relative z-10 mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${
                active
                  ? "border-primary bg-primary text-primary-foreground shadow-sm"
                  : done
                    ? "border-primary bg-primary/15 text-primary"
                    : "border-border bg-card text-muted-foreground"
              }`}
            >
              {done ? "✓" : index + 1}
            </span>

            <div className="min-w-0 flex-1 pt-0.5">
              <div className="flex flex-wrap items-center gap-2">
                <p
                  className={`text-sm font-semibold ${
                    active || done
                      ? "text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {step}
                </p>
                {active && liveLabel && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-primary">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                    </span>
                    {liveLabel}
                  </span>
                )}
              </div>
              {hist && (
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {formatDateTime(hist.changedAt)}
                  {hist.note ? ` · ${hist.note}` : ""}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
