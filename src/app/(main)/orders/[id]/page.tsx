// app/(main)/orders/[id]/page.tsx
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ApiError } from "@/shared/lib/http/fetch-json";
import {
  getOrder,
  OrdersShell,
  OrderDetailView,
} from "@/features/orders";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const t = await getTranslations("orders");
  const { id } = await params;

  let order;
  try {
    order = await getOrder(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  return (
    <OrdersShell title={t("detailTitle")}>
      <OrderDetailView
        order={order}
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
    </OrdersShell>
  );
}
