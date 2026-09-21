// app/(main)/addresses/[id]/edit/page.tsx
import { notFound } from "next/navigation";
import { getAddress } from "@/features/addresses/api";
import { AddressDetailClient } from "@/features/addresses";

interface EditAddressPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAddressPage({ params }: EditAddressPageProps) {
  const { id } = await params;
  const result = await getAddress(id);

  if (!result.success) notFound();

  return <AddressDetailClient address={result.data} />;
}