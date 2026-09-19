// src/features/support-chat/components/sections/Conversations/index.tsx
// Server Component — no "use client"
import { getTranslations } from "next-intl/server";
import { getAccessToken } from "@/shared/lib/http/token-storage";
import { getConversations } from "../api";
import { ConversationsEmpty } from "./ConversationsEmpty";
import { ConversationsLiveClient } from "./ConversationsLiveClient";
import { ConversationsSkeleton } from "./ConversationsSkeleton";

export async function Conversations() {
  const t = await getTranslations("supportChat");
  const [accessToken, conversations] = await Promise.all([
    getAccessToken(),
    getConversations(),
  ]);

  if (conversations.length === 0) {
    return (
      <ConversationsEmpty
        title={t("emptyTitle")}
        description={t("emptyDescription")}
        ctaLabel={t("emptyCta")}
        href="/home"
      />
    );
  }

  return (
    <ConversationsLiveClient initial={conversations} accessToken={accessToken} />
  );
}

export { ConversationsSkeleton };
Conversations.Skeleton = ConversationsSkeleton;