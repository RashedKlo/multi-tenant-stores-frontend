// app/(main)/addresses/add/page.tsx
import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { AddressesShell, AddressForm } from "@/features/addresses";
import { AddAddressClient } from "@/features/addresses/components/AddAddressClient";

interface PageProps {
  searchParams: Promise<{ returnTo?: string }>;
}

export default async function AddAddressPage({ searchParams }: PageProps) {
  const t = await getTranslations("addresses");
 const{returnTo}=await searchParams;

  return <AddAddressClient back={t("back")} addTitle={t("addTitle")} returnTo={returnTo}
                          addSubtitle= {t("addSubtitle")}/>
}