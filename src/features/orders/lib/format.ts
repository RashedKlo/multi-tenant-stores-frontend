// features/orders/lib/format.ts

export function formatMoney(value: number, currency = "USD"): string {
  try {
    return new Intl.NumberFormat(undefined, {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${value.toFixed(2)} ${currency}`;
  }
}

export function formatDateTime(iso: string, locale?: string): string {
  try {
    return new Intl.DateTimeFormat(locale, {
      dateStyle: "medium",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function shortOrderId(id: string): string {
  if (!id) return "";
  return id.length > 8 ? `${id.slice(0, 8)}…` : id;
}
