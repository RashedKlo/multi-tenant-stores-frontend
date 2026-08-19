// app/(main)/addresses/page.tsx
import Link from "next/link";
import { Suspense } from "react";
import { AddressesShell } from "@/features/addresses/components/AddressesShell";
import { AddressList } from "@/features/addresses/components/AddressList";
import AddressesSkeleton from "@/features/addresses/components/skeleton";

export default function AddressesPage() {
  return (
    <AddressesShell>
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">My Addresses</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your delivery locations
          </p>
        </div>

        <Link
          href="/addresses/add"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform active:scale-95"
          aria-label="Add new address"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </Link>
      </div>

      <Suspense fallback={<AddressesSkeleton />}>
        <AddressList />
      </Suspense>
    </AddressesShell>
  );
}