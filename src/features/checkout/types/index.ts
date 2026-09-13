// features/checkout/types/index.ts

export type CheckoutRequest = {
  storeId: string;
  addressId: string;
  deliveryPhone?: string | null;
};

export type CheckoutResult = {
  orderId: string;
  checkoutUrl: string;
  sessionId: string;
};

export type CheckoutCartLine = {
  cartItemId: string;
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  unitPrice: number;
  itemTotalPrice: number;
  notes?: string | null;
};
