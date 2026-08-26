// src/features/cart/components/CartShell.tsx
interface CartShellProps {
  children: React.ReactNode;
}

export function CartShell({ children }: CartShellProps) {
  return <main className="min-h-dvh pb-24">{children}</main>;
}