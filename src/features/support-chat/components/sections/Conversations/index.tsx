// Server Component — no "use client"
import { getTranslations } from "next-intl/server";
import { getAccessToken } from "@/shared/lib/http/token-storage";
import { getConversations } from "../../../api";
import { ConversationsEmpty } from "./empty";
import { ConversationsClient } from "./ConversationsClient";
import { ConversationsSkeleton } from "./skeleton";

export async function Conversations() {
  const t = await getTranslations("supportChat");
  const [accessToken, result] = await Promise.all([
    getAccessToken(),
    getConversations(),
  ]);

  if (!result.success || result.data.length === 0) {
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
    <ConversationsClient initial={result.data} accessToken={accessToken} />
  );
}

export { ConversationsSkeleton };
Conversations.Skeleton = ConversationsSkeleton;