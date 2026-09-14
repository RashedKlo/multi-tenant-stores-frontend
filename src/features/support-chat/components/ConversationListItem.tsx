// features/support-chat/components/ConversationListItem.tsx
import Link from "next/link";
import type { ConversationSummary } from "../types";
import { formatConversationTime } from "../lib/format";

interface ConversationListItemProps {
  conversation: ConversationSummary;
}

export function ConversationListItem({
  conversation,
}: ConversationListItemProps) {
  const unread = conversation.unreadCount > 0;

  return (
    <Link
      href={`/chat/${conversation.tenantId}`}
      className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-muted/40 active:bg-muted/60"
    >
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
        {(conversation.tenantName || "?").slice(0, 1).toUpperCase()}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline justify-between gap-2">
          <p
            className={`truncate text-sm ${
              unread ? "font-bold text-foreground" : "font-semibold text-foreground"
            }`}
          >
            {conversation.tenantName}
          </p>
          <time className="shrink-0 text-[11px] text-muted-foreground">
            {formatConversationTime(conversation.lastMessageAt)}
          </time>
        </div>

        <div className="mt-0.5 flex items-center justify-between gap-2">
          <p
            className={`truncate text-sm ${
              unread ? "font-medium text-foreground" : "text-muted-foreground"
            }`}
          >
            {conversation.lastMessageBody || "—"}
          </p>
          {unread && (
            <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-primary-foreground">
              {conversation.unreadCount > 99 ? "99+" : conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
