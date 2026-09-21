"use client";

import Image from "next/image";
import Link from "next/link";
import type { StoreSummary } from "@/features/search/types";

interface StoreCardProps {
  store: StoreSummary;
}

export function StoreCard({ store }: StoreCardProps) {
  return (
    <Link
      href={`/stores/${store.id}`}
      className="group flex items-center gap-3 rounded-2xl border border-border bg-card p-3 transition-all active:scale-[0.98] hover:shadow-md"
    >
      <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-muted">
        {store.logoUrl ? (
          <Image
            src={store.logoUrl}
            alt={store.name}
            fill
            className="object-cover"
            sizes="56px"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-lg font-bold text-muted-foreground">
            {store.name.charAt(0)}
          </div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold">{store.name}</h3>
        <div className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
          <svg
            className="h-3.5 w-3.5 fill-amber-400 text-amber-400"
            viewBox="0 0 24 24"
          >
            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
          </svg>
          <span className="font-medium text-foreground">
            {store.rating.toFixed(1)}
          </span>
        </div>
      </div>

      <svg
        className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </Link>
  );
}