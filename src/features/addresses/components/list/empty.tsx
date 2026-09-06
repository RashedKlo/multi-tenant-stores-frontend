// features/addresses/components/empty.tsx
import Link from "next/link";
import { getTranslations } from "next-intl/server";

export default async function AddressesEmpty() {
  const t = await getTranslations("addresses");

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <svg
          className="h-8 w-8 text-muted-foreground"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
          aria-hidden
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
      </div>
      <div>
        <h2 className="text-lg font-semibold">{t("empty.title")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {t("empty.description")}
        </p>
      </div>
      <Link
        href="/addresses/add"
        className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-transform active:scale-95"
      >
        {t("empty.addCta")}
      </Link>
    </div>
  );
}