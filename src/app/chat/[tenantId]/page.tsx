// app/(main)/chat/[tenantId]/page.tsx
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ChatShell } from "@/features/support-chat";
import { ChatThread } from "@/features/support-chat";
import { ChatThreadSkeleton } from "@/features/support-chat";

interface ChatTenantPageProps {
  params: Promise<{ tenantId: string }>;
}

export default async function ChatTenantPage({ params }: ChatTenantPageProps) {
  const { tenantId } = await params;
  if (!tenantId) notFound();

  return (
    <ChatShell flush>
      <Suspense fallback={<ChatThreadSkeleton />}>
        <ChatThread tenantId={tenantId} />
      </Suspense>
    </ChatShell>
  );
}