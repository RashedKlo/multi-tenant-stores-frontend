// app/(main)/orders/[id]/page.tsx
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { OrdersShell } from "@/features/orders";
import { OrderDetail } from "@/features/orders/components/OrderDetail";
import { OrderDetailSkeleton } from "@/features/orders/components/OrderDetail/skeleton";

interface OrderDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const t = await getTranslations("orders");
  const { id } = await params;

  return (
    <OrdersShell title={t("detailTitle")}>
      <Suspense fallback={<OrderDetailSkeleton />}>
        <OrderDetail orderId={id} />
      </Suspense> 
    </OrdersShell>
  );
}