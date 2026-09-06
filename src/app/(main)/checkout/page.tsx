import Link from "next/link";
import { getTranslations } from "next-intl/server";
import { getAddresses } from "@/features/addresses";
import {
  CheckoutAddressSelector,
  CheckoutShell,
} from "@/features/checkout";

interface CheckoutPageProps {
  searchParams: Promise<{ addressId?: string }>;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const t = await getTranslations("checkout");
  const [{ addressId }, addresses] = await Promise.all([
    searchParams,
    getAddresses(),
  ]);
  const sortedAddresses = [...addresses].sort(
    (a, b) => Number(b.isDefault) - Number(a.isDefault),
  );

  return (
    <CheckoutShell>

      {sortedAddresses.length > 0 ? (
        <CheckoutAddressSelector
          addresses={sortedAddresses}
          selectedAddressId={addressId}
        />
      ) : (
        <div className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
          <p className="text-sm font-medium text-primary">{t("addressSection")}</p>
        
          <p className="mt-2 text-sm text-muted-foreground">
            {t("subtitle")}
          </p>
          <Link
            href="/addresses/add?returnTo=%2Fcheckout"
            className="mt-5 inline-flex h-11 items-center justify-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t("changeAddress")}
          </Link>
        </div>
      )}
    </CheckoutShell>
  );
}