// features/orders/components/OrdersEmpty.tsx
import Link from "next/link";

interface OrdersEmptyProps {
  title: string;
  description: string;
  ctaLabel: string;
  href?: string;
}

export function OrdersEmpty({
  title,
  description,
  ctaLabel,
  href = "/home",
}: OrdersEmptyProps) {
  return (
    <div className="rounded-2xl border border-dashed border-border bg-card/60 px-6 py-14 text-center">
      <p className="text-base font-semibold text-foreground">{title}</p>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <Link
        href={href}
        className="mt-6 inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
