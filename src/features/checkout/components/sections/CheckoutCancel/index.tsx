import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { CheckoutShell } from "../../CheckoutShell";

export async function CheckoutCancel() {
  const t = await getTranslations("checkout");

  return (
    <CheckoutShell>
      <div className="flex flex-col items-center px-2 py-10 text-center sm:py-16">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
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
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4" />
            <path d="M12 16h.01" />
          </svg>
        </div>

        <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
          {t("cancelTitle")}
        </h1>
        <p className="mt-2 max-w-md text-sm text-muted-foreground sm:text-base">
          {t("cancelDescription")}
        </p>

        <div className="mt-8 flex w-full max-w-xs flex-col gap-3 sm:max-w-sm sm:flex-row sm:justify-center">
          <Link
            href="/cart"
            className="inline-flex h-11 flex-1 items-center justify-center rounded-full border border-border bg-background px-5 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            {t("backToCart")}
          </Link>
        </div>
      </div>
    </CheckoutShell>
  );
}