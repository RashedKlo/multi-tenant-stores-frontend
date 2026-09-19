// src/features/cart/components/CartShell.tsx
interface CartShellProps {
  title: string;
  children: React.ReactNode;
}

export function CartShell({ title, children }: CartShellProps) {
  return (
    <div className="min-h-[60vh] pb-8 md:pb-12">
      <div className="mx-auto w-full max-w-3xl space-y-6 px-4 py-6">
        <header className="flex items-baseline justify-between gap-3">
          <h1 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {title}
          </h1>
        
        </header>
        {children}
      </div>
    </div>
  );
}
