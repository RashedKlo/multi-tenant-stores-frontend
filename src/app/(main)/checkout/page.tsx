// app/(main)/checkout/page.tsx
import { redirect } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getAddresses } from "@/features/addresses";
import { getCart } from "@/features/cart";
import {
  CheckoutShell,
  CheckoutAddressSelector,
  CheckoutCartSummary,
  CheckoutEmptyCart,
  CheckoutNoAddress,
  addAddressHref,
  type CheckoutCartLine,
} from "@/features/checkout";

interface CheckoutPageProps {
  searchParams: Promise<{
    storeId?: string;
    addressId?: string;
  }>;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const t = await getTranslations("checkout");
  const params = await searchParams;
  const storeId = params.storeId?.trim();

  if (!storeId) {
    redirect("/cart");
  }

  const [addresses, cartItems] = await Promise.all([
    getAddresses(),
    getCart(),
  ]);

  // Cart is multi-store; keep only lines for this store
  const storeItems = cartItems.filter(
    (item) => item.storeId === storeId,
  );

  const summaryLines: CheckoutCartLine[] = storeItems.map((item) => ({
    cartItemId: item.cartItemId,
    productId: item.productId,
    productName: item.productName,
    productImage: item.productImage ?? "",
    quantity: item.quantity,
    unitPrice: item.basePrice,
    itemTotalPrice: item.itemTotalPrice,
    notes: item.notes,
  }));

  const sortedAddresses = [...addresses].sort(
    (a, b) => Number(b.isDefault) - Number(a.isDefault),
  );

  return (
    <CheckoutShell title={t("title")} subtitle={t("subtitle")}>
      <div className="space-y-6">
        {summaryLines.length === 0 ? (
          <CheckoutEmptyCart
            title={t("emptyCartTitle")}
            description={t("emptyCartDescription")}
            ctaLabel={t("emptyCartCta")}
            href={`/stores/${storeId}`}
          />
        ) : (
          <>
            <CheckoutCartSummary
              items={summaryLines}
              title={t("orderSummary")}
              totalLabel={t("total")}
              itemsLabel={t("items")}
            />

            {sortedAddresses.length === 0 ? (
              <CheckoutNoAddress
                title={t("noAddressTitle")}
                description={t("noAddressDescription")}
                ctaLabel={t("addAddress")}
                href={addAddressHref(storeId)}
              />
            ) : (
              <CheckoutAddressSelector
                addresses={sortedAddresses}
                storeId={storeId}
                selectedAddressId={params.addressId}
              />
            )}
          </>
        )}
      </div>
    </CheckoutShell>
  );
}
