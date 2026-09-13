// features/orders/components/OrderStatusBadge.tsx
import { resolveStatusName } from "../constants";
import type { OrderStatusName } from "../types";

const STYLES: Record<OrderStatusName, string> = {
  Pending:
    "bg-amber-500/15 text-amber-700 dark:text-amber-400",
  Confirmed:
    "bg-sky-500/15 text-sky-700 dark:text-sky-400",
  Preparing:
    "bg-violet-500/15 text-violet-700 dark:text-violet-400",
  OutForDelivery:
    "bg-indigo-500/15 text-indigo-700 dark:text-indigo-400",
  Delivered:
    "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
  Cancelled:
    "bg-rose-500/15 text-rose-700 dark:text-rose-400",
  Unknown:
    "bg-muted text-muted-foreground",
};

interface OrderStatusBadgeProps {
  status: number | string;
  label?: string;
  className?: string;
}

export function OrderStatusBadge({
  status,
  label,
  className = "",
}: OrderStatusBadgeProps) {
  const name = resolveStatusName(status);
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${STYLES[name]} ${className}`}
    >
      {label ?? name}
    </span>
  );
}
