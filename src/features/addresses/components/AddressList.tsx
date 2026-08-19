// features/addresses/components/AddressList.tsx
import { getAddresses } from "../api";
import { MOCK_ADDRESSES } from "../constants/addresses";
import { AddressListClient } from "./AddressListClient";
import AddressesEmpty from "./empty";

export async function AddressList() {
  // const addresses = await getAddresses();
  const addresses=MOCK_ADDRESSES;

  if (!addresses.length) {
    return <AddressesEmpty />;
  }

  return <AddressListClient initialAddresses={addresses} />;
}