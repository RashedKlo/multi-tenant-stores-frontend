// features/checkout/components/CheckoutNoAddress.tsx
import Link from "next/link";

interface CheckoutNoAddressProps {
  title: string;
  description: string;
  ctaLabel: string;
  href: string;
}

export function CheckoutNoAddress({
  title,
  description,
  ctaLabel,
  href,
}: CheckoutNoAddressProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
      <p className="text-sm font-semibold text-foreground">{title}</p>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <Link
        href={href}
        className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        {ctaLabel}
      </Link>
    </div>
  );
}
