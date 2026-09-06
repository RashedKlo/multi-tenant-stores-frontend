interface CheckoutShellProps {
  children: React.ReactNode;
}

export function CheckoutShell({ children }: CheckoutShellProps) {
  return (
    <main className="mx-auto min-h-dvh w-full max-w-2xl px-4 pb-24 pt-6 sm:px-6 sm:pt-8">
      {children}
    </main>
  );
}