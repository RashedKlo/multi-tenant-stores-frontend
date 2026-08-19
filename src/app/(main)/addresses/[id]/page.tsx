// app/(main)/addresses/[id]/edit/page.tsx
import { notFound } from "next/navigation";
import { getAddress } from "@/features/addresses/api";
import { EditAddressClient } from "@/features/addresses/components/EditAddressClient";
import { AddressDetailClient } from "@/features/addresses/components/AddressDetailClient";
import { MOCK_ADDRESSES } from "@/features/addresses/constants/addresses";

interface EditAddressPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAddressPage({ params }: EditAddressPageProps) {
  const { id } = await params;
  // const address = await getAddress(id);
  const address=MOCK_ADDRESSES[0];

  if (!address) notFound();

  return (
    <>
      <AddressDetailClient address={address} />
    </>
  );
}