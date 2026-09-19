// app/(main)/addresses/[id]/edit/page.tsx
import { notFound } from "next/navigation";
import { getAddress } from "@/features/addresses/api";
import { EditAddressClient } from "@/features/addresses";

interface EditAddressPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ returnTo?: string }>;
}

export default async function EditAddressPage({
  params,
  searchParams,
}: EditAddressPageProps) {
  const { id } = await params;
  const { returnTo } = await searchParams;

  const address = await getAddress(id);
  if (!address) notFound();

  return <EditAddressClient address={address} returnTo={returnTo} />;
}