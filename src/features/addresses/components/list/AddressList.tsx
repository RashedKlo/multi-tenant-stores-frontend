// features/addresses/components/AddressList.tsx
import { getAddresses } from "../../api";
import { AddressListClient } from "./AddressListClient";
import AddressesEmpty from "./empty";

export async function AddressList() {
  const addresses = await getAddresses();

  if (addresses.length === 0) {
    return <AddressesEmpty />;
  }

  // Default first for better UX
  const sorted = [...addresses].sort(
    (a, b) => Number(b.isDefault) - Number(a.isDefault),
  );

  return <AddressListClient addresses={sorted} />;
}