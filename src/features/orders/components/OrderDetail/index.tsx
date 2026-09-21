// src/features/orders/components/sections/OrderDetail/index.tsx
// Server Component — no "use client"
import { getTranslations } from "next-intl/server";
import { getOrder } from "../../api";
import { OrderDetailView } from "../OrderDetail/OrderDetailView";
import { OrderDetailEmpty } from "./empty";
import { OrderDetailSkeleton } from "./skeleton";

interface OrderDetailProps {
  orderId: string;
}

export async function OrderDetail({ orderId }: OrderDetailProps) {
  const t = await getTranslations("orders");

  const result = await getOrder(orderId);

  if (!result.success) return <OrderDetailEmpty />;

  return (
    <OrderDetailView
      order={result.data}
      labels={{
        orderId: t("orderId"),
        placedAt: t("placedAt"),
        delivery: t("delivery"),
        items: t("items"),
        subtotal: t("subtotal"),
        discount: t("discount"),
        total: t("total"),
        history: t("history"),
        track: t("track"),
        back: t("allOrders"),
        qty: t("qty"),
      }}
    />
  );
}

OrderDetail.Skeleton = OrderDetailSkeleton;