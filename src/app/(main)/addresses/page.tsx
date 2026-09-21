
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
    <AddressesShell title={t("title")} subtitle={t("subtitle")} addNew={t("addNew")}>
      <Suspense fallback={<AddressesSkeleton />}>
        <AddressList />
      </Suspense>
    </AddressesShell>
  );
}