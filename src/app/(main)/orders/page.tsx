// app/(main)/orders/page.tsx
import { getTranslations } from "next-intl/server";
import {
  getOrders,
  OrdersShell,
  OrderCard,
  OrdersEmpty,
} from "@/features/orders";

export default async function OrdersPage() {
  const t = await getTranslations("orders");

  let items: Awaited<ReturnType<typeof getOrders>>["items"] = [];
  try {
    const page = await getOrders({ page: 1, pageSize: 30 });
    items = page.items ?? [];
  } catch {
    items = [];
  }

  return (
    <OrdersShell title={t("listTitle")} subtitle={t("listSubtitle")}>
      {items.length === 0 ? (
        <OrdersEmpty
          title={t("emptyTitle")}
          description={t("emptyDescription")}
          ctaLabel={t("emptyCta")}
          href="/home"
        />
      ) : (
        <ul className="space-y-3">
          {items.map((order) => (
            <li key={order.id}>
              <OrderCard
                order={order}
                labels={{
                  total: t("total"),
                  track: t("track"),
                  view: t("view"),
                }}
              />
            </li>
          ))}
        </ul>
      )}
    </OrdersShell>
  );
}
