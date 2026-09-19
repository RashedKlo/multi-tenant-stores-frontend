
import { getCart } from "../api/get-cart";
import { CartClient } from "./CartClient";
import { CartEmpty } from "./empty";
import { CartItemsSkeleton } from "./skeleton";

export async function Cart() {
  const items = await getCart();

  if (items.length === 0) return <CartEmpty />;

  return <CartClient items={items} />;
}

Cart.Skeleton = CartItemsSkeleton;