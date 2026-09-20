// app/(main)/orders/page.tsx
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { OrdersShell } from "@/features/orders";
import { Orders } from "@/features/orders/components/Orders";
import { OrdersSkeleton } from "@/features/orders/components/Orders/skeleton";
import { AuthGate } from "@/shared/lib/ui";

export default async function OrdersPage() {
  const t = await getTranslations("orders");

  return <AuthGate redirectTo="/login">
    <OrdersShell title={t("listTitle")} subtitle={t("listSubtitle")}>
      <Suspense fallback={<OrdersSkeleton />}>
        <Orders />
      </Suspense>
    </OrdersShell>
  </AuthGate>;
  
}