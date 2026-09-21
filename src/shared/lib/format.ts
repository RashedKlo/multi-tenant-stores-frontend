// lib/format.ts
const SAR_FORMATTER_CACHE = new Map<string, Intl.NumberFormat>();

export function formatPrice(
  amount: number,
  opts?: { locale?: string; currency?: string; sign?: boolean },
): string {
  const key = `opts?.locale??""∣{opts?.locale ?? ""}|opts?.locale??""∣{opts?.currency ?? "SAR"}`;
  let fmt = SAR_FORMATTER_CACHE.get(key);
  if (!fmt) {
    fmt = new Intl.NumberFormat(opts?.locale, {
      style: "currency",
      currency: opts?.currency ?? "SAR",
    });
    SAR_FORMATTER_CACHE.set(key, fmt); // cache formatters — they're expensive to construct
  }

  const formatted = fmt.format(Math.abs(amount));
  if (opts?.sign && amount > 0) return `+${formatted}`;
  return amount < 0 ? `-${formatted}` : formatted;
}
export function isNumber(v?: string): number | undefined {
  if (v == null || v === "") return undefined;
  const n = Number(v);
  return Number.isFinite(n) ? n : undefined;
}

// features/support-chat/lib/format.ts

export function formatMessageTime(iso: string, locale?: string): string {
  try {
    const d = new Date(iso);
    const now = new Date();
    const sameDay =
      d.getFullYear() === now.getFullYear() &&
      d.getMonth() === now.getMonth() &&
      d.getDate() === now.getDate();

    if (sameDay) {
      return new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
      }).format(d);
    }

    return new Intl.DateTimeFormat(locale, {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(d);
  } catch {
    return iso;
  }
}

export function formatConversationTime(iso: string, locale?: string): string {
  try {
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const dayMs = 24 * 60 * 60 * 1000;

    if (diffMs < dayMs && d.getDate() === now.getDate()) {
      return new Intl.DateTimeFormat(locale, {
        hour: "2-digit",
        minute: "2-digit",
      }).format(d);
    }

    if (diffMs < 7 * dayMs) {
      return new Intl.DateTimeFormat(locale, { weekday: "short" }).format(d);
    }

    return new Intl.DateTimeFormat(locale, {
      month: "short",
      day: "numeric",
    }).format(d);
  } catch {
    return iso;
  }
}
