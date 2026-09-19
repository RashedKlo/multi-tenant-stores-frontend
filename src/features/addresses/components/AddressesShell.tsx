import Link from "next/link";

// features/addresses/components/AddressesShell.tsx
interface AddressesShellProps {
  title:string,
  subtitle:string,
  addNew:string,
  children: React.ReactNode;
}

export function AddressesShell({title,subtitle,addNew, children }: AddressesShellProps) {
  return (
    <main className="mx-auto min-h-dvh w-full max-w-lg px-4 pb-24 pt-4">
          <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
        </div>

        <Link
          href="/addresses/add"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm transition-transform active:scale-95"
          aria-label={addNew}
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
        </Link>
      </div>
      {children}
    </main>
  );
}