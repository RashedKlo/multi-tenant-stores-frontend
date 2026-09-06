// features/addresses/components/AddressesShell.tsx
interface AddressesShellProps {
  children: React.ReactNode;
}

export function AddressesShell({ children }: AddressesShellProps) {
  return (
    <main className="mx-auto min-h-dvh w-full max-w-lg px-4 pb-24 pt-4">
      {children}
    </main>
  );
}