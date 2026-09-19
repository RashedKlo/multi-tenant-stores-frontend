// app/(main)/chat/page.tsx
import { Suspense } from "react";
import { getTranslations } from "next-intl/server";
import { ChatShell } from "@/features/support-chat";
import { Conversations,ConversationsSkeleton } from "@/features/support-chat";

export default async function ChatPage() {
  const t = await getTranslations("supportChat");

  return (
    <ChatShell title={t("listTitle")} subtitle={t("listSubtitle")}>
      <Suspense fallback={<ConversationsSkeleton />}>
        <Conversations />
      </Suspense>
    </ChatShell>
  );
}