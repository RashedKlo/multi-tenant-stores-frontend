// features/orders/constants/index.ts
import type { OrderStatusName } from "../types";

/**
 * Backend OrderStatus enum values (typical sequential).
 * Adjust if your Domain.Enums.OrderStatus differs.
 */
export const ORDER_STATUS_MAP: Record<number, OrderStatusName> = {
  0: "Pending",
  1: "Confirmed",
  2: "Preparing",
  3: "OutForDelivery",
  4: "Delivered",
  5: "Cancelled",
};

/** Visual order of the tracking timeline (exclude Cancelled). */
export const TRACKING_STEPS: OrderStatusName[] = [
  "Pending",
  "Confirmed",
  "Preparing",
  "OutForDelivery",
  "Delivered",
];

export function resolveStatusName(
  status: number | string | undefined | null,
): OrderStatusName {
  if (status === null || status === undefined) return "Unknown";
  if (typeof status === "string") {
    const normalized = status.trim();
    if (
      TRACKING_STEPS.includes(normalized as OrderStatusName) ||
      normalized === "Cancelled"
    ) {
      return normalized as OrderStatusName;
    }
    const asNum = Number(normalized);
    if (!Number.isNaN(asNum) && ORDER_STATUS_MAP[asNum]) {
      return ORDER_STATUS_MAP[asNum];
    }
    return "Unknown";
  }
  return ORDER_STATUS_MAP[status] ?? "Unknown";
}

export function isTerminalStatus(name: OrderStatusName): boolean {
  return name === "Delivered" || name === "Cancelled";
}
