// app/(main)/addresses/add/page.tsx
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { AddressesShell, AddressForm } from "@/features/addresses";

interface PageProps {
  searchParams: Promise<{ returnTo?: string }>;
}

export default async function AddAddressPage({ searchParams }: PageProps) {
  const t = await getTranslations("addresses");
  const params = await searchParams;
  const returnTo = params.returnTo;

  return (
    <AddressesShell>
      <div className="mb-5 flex items-center gap-3">
        <Link
          href={returnTo || "/addresses"}
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label={t("back")}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Link>
        <div>
          <h1 className="text-xl font-bold">{t("addTitle")}</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">{t("addSubtitle")}</p>
        </div>
      </div>

      <AddressForm mode="create" returnTo={returnTo} />
    </AddressesShell>
  );
}