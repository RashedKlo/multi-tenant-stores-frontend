import { redirect } from "next/navigation";
import type { ReactNode } from "react";
import { getAccessToken } from "@/shared/lib/http/token-storage";

interface AuthGateProps {
  children: ReactNode;
  redirectTo?: string;
}

export async function AuthGate({
  children,
  redirectTo = "/home",
}: AuthGateProps) {
  const accessToken = await getAccessToken();

  if (!accessToken) {
    redirect(`/login?redirect=${encodeURIComponent(redirectTo)}`);
  }

  return children;
}