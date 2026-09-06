// app/(main)/addresses/page.tsx
import Link from "next/link";
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import {
  AddressesShell,
  AddressList,
  AddressesSkeleton,
} from "@/features/addresses";

export default async function AddressesPage() {
  const t = await getTranslations("addresses");

  return (
    <AddressesShell>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{t("title")}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{t("subtitle")}</p>
        </div>

        <Link
          href="/addresses/add"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform active:scale-95"
          aria-label={t("addNew")}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </Link>
      </div>

      <Suspense fallback={<AddressesSkeleton />}>
        <AddressList />
      </Suspense>
    </AddressesShell>
  );
}