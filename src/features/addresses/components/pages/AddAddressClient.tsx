// features/addresses/components/AddAddressClient.tsx
"use client";

import { AddressForm } from "../form/AddressForm";
import Link from "next/link";

interface AddAddressClientProps {
  addTitle:string;
  addSubtitle:string;
  back:string;
  returnTo:string|undefined;
}

export function AddAddressClient({ addTitle,addSubtitle,back,returnTo }: AddAddressClientProps) {
  return <> <div className="mb-5 flex items-center gap-3">
        <Link
          href={returnTo || "/addresses"}
          className="rounded-lg p-2 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          aria-label={back}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </Link>
        <div>
          <h1 className="text-xl font-bold">{addTitle}</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">{addSubtitle}</p>
        </div>
      </div>

      <AddressForm mode="create" returnTo={returnTo} />
      </>
}