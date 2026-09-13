// features/checkout/constants/index.ts

/** Query param key for store scoped checkout */
export const CHECKOUT_STORE_PARAM = "storeId";

/** Query param key for pre-selected address */
export const CHECKOUT_ADDRESS_PARAM = "addressId";

/** Return path used when adding an address during checkout */
export function checkoutReturnPath(storeId: string): string {
  return `/checkout?storeId=${encodeURIComponent(storeId)}`;
}

export function addAddressHref(storeId: string): string {
  const returnTo = encodeURIComponent(checkoutReturnPath(storeId));
  return `/addresses/add?returnTo=${returnTo}`;
}
