// app/(main)/orders/[id]/track/page.tsx
import { Suspense } from "react";
import { OrdersShell } from "@/features/orders";
import { OrderTracking } from "@/features/orders/components/OrderTracking";
import { OrderTrackingSkeleton } from "@/features/orders/components/OrderTracking/skeleton";

interface TrackPageProps {
  params: Promise<{ id: string }>;
}

export default async function OrderTrackPage({ params }: TrackPageProps) {
  const { id } = await params;

  return (
    <OrdersShell>
      <Suspense fallback={<OrderTrackingSkeleton />}>
        <OrderTracking orderId={id} />
      </Suspense>
    </OrdersShell>
  );
}