// app/(main)/checkout/success/page.tsx
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { CheckoutShell } from "@/features/checkout";

interface SuccessPageProps {
  searchParams: Promise<{
    orderId?: string;
    session_id?: string;
  }>;
}

export default async function CheckoutSuccessPage({
  searchParams,
}: SuccessPageProps) {
  const t = await getTranslations("checkout");
  const { orderId, session_id: sessionId } = await searchParams;

  return (
    <CheckoutShell>
      <div className="flex flex-col items-center px-2 py-10 text-center sm:py-16">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-8 w-8"
            aria-hidden
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>

        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {t("successTitle")}
        </h1>
        <p className="mt-2 max-w-md text-sm text-muted-foreground sm:text-base">
          {t("successDescription")}
        </p>

        {(orderId || sessionId) && (
          <p className="mt-4 rounded-lg bg-muted px-3 py-1.5 font-mono text-xs text-muted-foreground">
            {orderId
              ? `${t("orderId")}: ${orderId}`
              : `${t("sessionId")}: ${sessionId}`}
          </p>
        )}

        <div className="mt-8 flex w-full max-w-xs flex-col gap-3 sm:max-w-sm sm:flex-row sm:justify-center">
          <Link
            href={orderId ? `/orders/${orderId}` : "/orders"}
            className="inline-flex h-11 flex-1 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t("viewOrder")}
          </Link>
          <Link
            href="/home"
            className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-border bg-background px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            {t("continueShopping")}
          </Link>
        </div>
      </div>
    </CheckoutShell>
  );
}
