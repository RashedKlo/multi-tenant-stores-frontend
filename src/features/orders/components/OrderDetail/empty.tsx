import { getTranslations } from "next-intl/server";
import { OrdersEmpty } from "../OrdersEmpty";

export async function OrderDetailEmpty() {
  const t = await getTranslations("orders");

  return (
    <OrdersEmpty
      title={t("emptyTitle")}
      description={t("emptyDescription")}
      ctaLabel={t("emptyCta")}
    />
  );
}