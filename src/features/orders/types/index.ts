// features/orders/types/index.ts

/** Matches backend Domain.Enums.OrderStatus (serialized as int in OpenAPI). */
export type OrderStatusCode = number;

export type OrderStatusName =
  | "Pending"
  | "Confirmed"
  | "Preparing"
  | "OutForDelivery"
  | "Delivered"
  | "Cancelled"
  | "Unknown";
  export type TrackingConnectionState =
  | "idle"
  | "connecting"
  | "connected"
  | "reconnecting"
  | "disconnected"
  | "error";


export interface OrderStatusHistoryItem {
  status: OrderStatusCode | string;
  note: string | null;
  changedAt: string;
}

export interface OrderItemOption {
  id: string;
  name: string;
  priceAdjustment: number;
}

export interface OrderItem {
  id: string;
  productId: string | null;
  name: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
  options: OrderItemOption[];
}

export interface PaymentSummary {
  id: string;
  status: number;
  amount: number;
  currency: string;
  paidAt: string | null;
}

export interface OrderSummary {
  id: string;
  storeId: string;
  status: OrderStatusCode | string;
  subtotal: number;
  discountTotal: number;
  total: number;
  createdAt: string;
}

export interface OrderDetail extends OrderSummary {
  deliveryName: string;
  deliveryPhone: string | null;
  deliveryAddressText: string;
  deliveryLatitude: number;
  deliveryLongitude: number;
  updatedAt: string;
  items: OrderItem[];
  statusHistory: OrderStatusHistoryItem[];
  payment: PaymentSummary | null;
}

export interface PagedOrders {
  items: OrderSummary[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

/** Payload from SignalR "OrderStatusChanged" */
export interface OrderStatusChangedEvent {
  orderId: string;
  status: string;
  note: string | null;
  changedAt: string;
}
