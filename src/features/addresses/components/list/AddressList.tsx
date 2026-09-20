// features/addresses/components/AddressList.tsx
import { getAddresses } from "../../api";
import { AddressListClient } from "./AddressListClient";
import AddressesEmpty from "./empty";

export async function AddressList() {
  const result = await getAddresses();

  if (!result.success) {
    return <AddressesEmpty />;
  }
  const addresses = result.data;

  // Default first for better UX
  const sorted = [...addresses].sort(
    (a, b) => Number(b.isDefault) - Number(a.isDefault),
  );

  return <AddressListClient addresses={sorted} />;
}