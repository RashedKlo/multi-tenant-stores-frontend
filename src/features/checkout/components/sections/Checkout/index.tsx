import { getTranslations } from "next-intl/server";
import { AddressesEmpty, getAddresses } from "@/features/addresses";
import { CartEmpty, getCart } from "@/features/cart";
import { CheckoutAddressSelector } from "../../CheckoutAddressSelector";
import { CheckoutCartSummary } from "../../CheckoutCartSummary";
import { CheckoutEmptyCart } from "../../CheckoutEmptyCart";
import { CheckoutNoAddress } from "../../CheckoutNoAddress";
import { CheckoutShell } from "../../CheckoutShell";


interface CheckoutPageProps {
  storeId?: string;
  selectedAddressId?: string;
}

export async function CheckoutPage({
}: CheckoutPageProps) {
  const t = await getTranslations("checkout");

  const [addresses, cartItems] = await Promise.all([
    getAddresses(),
    getCart(),
  ]);
if(!cartItems.success) {
 return <CartEmpty/>
}
if(!addresses.success) {
  return <AddressesEmpty/>
}
  const sortedAddresses = [...addresses.data].sort(
    (first, second) => Number(second.isDefault) - Number(first.isDefault),
  );
const storeId = cartItems.data[0]?.storeId ?? "";
  return (
    <CheckoutShell title={t("title")} subtitle={t("subtitle")}>
      <div className="space-y-6">
        {cartItems.data.length === 0 ? (
          <CheckoutEmptyCart
            title={t("emptyCartTitle")}
            description={t("emptyCartDescription")}
            ctaLabel={t("emptyCartCta")}
            href={`/stores/${storeId}`}
          />
        ) : (
          <>
            <CheckoutCartSummary
              items={cartItems.data}
              title={t("orderSummary")}
              totalLabel={t("total")}
              itemsLabel={t("items")}
            />

            {sortedAddresses.length === 0 ? (
              <CheckoutNoAddress
                title={t("noAddressTitle")}
                description={t("noAddressDescription")}
                ctaLabel={t("addAddress")}
                href={"/addresses/add?returnTo=/checkout"}
              />
            ) : (
              <CheckoutAddressSelector
                addresses={sortedAddresses}
                storeId={storeId}
              />
            )}
          </>
        )}
      </div>
    </CheckoutShell>
  );
}

export { CheckoutSkeleton } from "./skeleton";