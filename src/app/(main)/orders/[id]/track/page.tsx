// app/(main)/orders/[id]/track/page.tsx
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ApiError } from "@/shared/lib/http/fetch-json";
import { getAccessToken } from "@/shared/lib/http/token-storage";
import {
  getOrder,
  OrdersShell,
  OrderTrackingClient,
} from "@/features/orders";

interface TrackPageProps {
  params: Promise<{ id: string }>;
}

/**
 * 1. Load order first (server).
 * 2. Pass order + token to client.
 * 3. Client opens SignalR only after order is available.
 */
export default async function OrderTrackPage({ params }: TrackPageProps) {
  const t = await getTranslations("orders");
  const { id } = await params;

  let order;
  try {
    order = await getOrder(id);
  } catch (error) {
    if (error instanceof ApiError && error.status === 404) notFound();
    throw error;
  }

  const accessToken = await getAccessToken();

  return (
    <OrdersShell>
      <OrderTrackingClient order={order} accessToken={accessToken} />
    </OrdersShell>
  );
}
