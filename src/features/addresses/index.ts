// features/addresses/index.ts
export { AddressesShell } from "./components/AddressesShell";
export { AddressList } from "./components/list";
export { AddressForm } from "./components/form/AddressForm";
export { AddressCard } from "./components/list/AddressCard";
export { EditAddressClient } from "./components/pages/EditAddressClient";
export {AddressDetailClient} from "./components/pages/AddressDetailClient"
export { default as AddressesSkeleton } from "./components/list/skeleton";
export { default as AddressesEmpty } from "./components/list/empty";

export * from "./actions";
export * from "./api";
export type * from "./types/addresses.types";