import { getCart } from "../../../api/get-cart";
import { CartClient } from "./CartClient";
import { CartEmpty } from "../CartItems/empty";
import { CartItemsSkeleton } from "../CartItems/skeleton";

export async function Cart() {
  const result = await getCart();

  if (!result.success || result.data.length === 0) {
    return <CartEmpty />;
  }

  return <CartClient items={result.data} />;
}

Cart.Skeleton = CartItemsSkeleton;