// features/addresses/components/AddressCard.tsx
"use client";

import Link from "next/link";
import type { Address } from "../types";
import { useRouter } from "next/router";

interface AddressCardProps {
  address: Address;
  onDelete: (id: string) => void;
  onSetDefault: (id: string) => void;
}

export function AddressCard({
  address,
  onDelete,
  onSetDefault,
}: AddressCardProps) {
  return (
    <Link href={"/addresses/12"} className="block rounded-2xl border border-border bg-card p-4 transition-all hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{address.label}</h3>
            {address.isDefault && (
              <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary">
                Default
              </span>
            )}
          </div>
          <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
            {address.addressText}
          </p>
        </div>

        <div className="flex items-center gap-1">
          {/* Edit */}
          <Link
            href={`/addresses/${address.id}/edit`}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:scale-95"
            aria-label="Edit address"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </Link>

          {/* Delete */}
          <button
            onClick={() => onDelete(address.id)}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-500 active:scale-95"
            aria-label="Delete address"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {!address.isDefault && (
        <button
          onClick={() => onSetDefault(address.id)}
          className="mt-3 text-xs font-medium text-primary hover:underline"
        >
          Set as default
        </button>
      )}
    </Link>
  );
}