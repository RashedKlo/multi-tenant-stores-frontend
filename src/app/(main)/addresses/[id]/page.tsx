// app/(main)/addresses/[id]/edit/page.tsx
import { notFound } from "next/navigation";
import { getAddress } from "@/features/addresses/api";
import { AddressDetailClient } from "@/features/addresses";

interface EditAddressPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAddressPage({ params }: EditAddressPageProps) {
  const { id } = await params;
  const address = await getAddress(id);

  if (!address) notFound();

  return <AddressDetailClient address={address} />;
}