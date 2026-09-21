// app/(main)/addresses/add/page.tsx
import { AddAddressClient } from "@/features/addresses/components/pages/AddAddressClient";
import { getTranslations } from "next-intl/server";

interface PageProps {
  searchParams: Promise<{ returnTo?: string }>;
}

export default async function AddAddressPage({ searchParams }: PageProps) {
  const t = await getTranslations("addresses");
  const { returnTo } = await searchParams;

  return (
    <AddAddressClient
      back={t("back")}
      addTitle={t("addTitle")}
      addSubtitle={t("addSubtitle")}
      returnTo={returnTo}
    />
  );
}