// features/support-chat/components/MessageBubble.tsx
import type { Message } from "../types";
import { SENDER_CUSTOMER } from "../constants";
import { formatMessageTime } from "../lib/format";

interface MessageBubbleProps {
  message: Message;
  isOwn: boolean;
}

export function MessageBubble({ message, isOwn }: MessageBubbleProps) {
  return (
    <div
      className={`flex w-full ${isOwn ? "justify-end" : "justify-start"}`}
    >
      <div
        className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 sm:max-w-[75%] ${
          isOwn
            ? "rounded-br-md bg-primary text-primary-foreground"
            : "rounded-bl-md border border-border bg-card text-foreground"
        }`}
      >
        <p className="whitespace-pre-wrap break-words text-sm leading-5">
          {message.body}
        </p>
        <p
          className={`mt-1 text-[10px] ${
            isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
          }`}
        >
          {formatMessageTime(message.createdAt)}
          {isOwn && message.senderType === SENDER_CUSTOMER
            ? message.isRead
              ? " · ✓✓"
              : " · ✓"
            : ""}
        </p>
      </div>
    </div>
  );
}
