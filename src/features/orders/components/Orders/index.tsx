// src/features/orders/components/sections/Orders/index.tsx
// Server Component — no "use client"
import { getTranslations } from "next-intl/server";
import { getOrders } from "../../api";
import { OrderCard } from "../Orders/OrderCard";
import { OrdersEmpty } from "./OrdersEmpty";
import { OrdersSkeleton } from "./skeleton";

export async function Orders() {
  const t = await getTranslations("orders");
    const result = await getOrders({ page: 1, pageSize: 30 });
   
  if (!result.success || result.data.items.length === 0) {
    return (
      <OrdersEmpty
        title={t("emptyTitle")}
        description={t("emptyDescription")}
        ctaLabel={t("emptyCta")}
        href="/home"
      />
    );
  }

  return (
    <ul className="space-y-3">
      {result.data.items.map((order) => (
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
  );
}

Orders.Skeleton = OrdersSkeleton;