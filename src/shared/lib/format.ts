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