
import { getAccessToken } from "@/shared/lib/http/token-storage";
import { getOrder } from "../../api";
import { OrderTrackingClient } from "../OrderTrackingClient";
import { OrderTrackingEmpty } from "./empty";
import { OrderTrackingSkeleton } from "./skeleton";

interface OrderTrackingProps {
  orderId: string;
}

/**
 * 1. Load order first (server).
 * 2. Pass order + token to client.
 * 3. Client opens SignalR only after order is available.
 */
export async function OrderTracking({ orderId }: OrderTrackingProps) {
  const order = await getOrder(orderId);

  if (!order) return <OrderTrackingEmpty />;

  const accessToken = (await getAccessToken()) ?? null;

  return <OrderTrackingClient order={order} accessToken={accessToken} />;
}

OrderTracking.Skeleton = OrderTrackingSkeleton;