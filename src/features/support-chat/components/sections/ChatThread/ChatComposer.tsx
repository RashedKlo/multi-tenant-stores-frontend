"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { sendMessage } from "../../../actions/send-message.action";
import type { Message } from "../../../types";

interface ChatComposerProps {
  conversationId: string;
  onOptimistic?: (temp: Message) => void;
  onSent?: (message: Message) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
}

export function ChatComposer({
  conversationId,
  onOptimistic,
  onSent,
  onError,
  disabled,
}: ChatComposerProps) {
  const t = useTranslations("supportChat");
  const [text, setText] = useState("");
  const [isPending, startTransition] = useTransition();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const element = textareaRef.current;
    if (!element) return;
    element.style.height = "auto";
    element.style.height = `${Math.min(element.scrollHeight, 120)}px`;
  }, [text]);

  function submit() {
    const body = text.trim();
    if (!body || isPending || disabled) return;

    const optimistic: Message = {
      id: `temp-${Date.now()}`,
      conversationId,
      senderType: "Customer",
      senderId: "me",
      body,
      isRead: false,
      createdAt: new Date().toISOString(),
    };
    onOptimistic?.(optimistic);
    setText("");

    startTransition(async () => {
      const result = await sendMessage({ conversationId, body });
      if (!result.success) {
        onError?.(result.error);
        return;
      }
      onSent?.(result.data);
    });
  }

  function onKeyDown(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      submit();
    }
  }

  return (
    <div className="border-t border-border bg-background/95 p-3 backdrop-blur supports-backdrop-filter:bg-background/80">
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          rows={1}
          value={text}
          onChange={(event) => setText(event.target.value)}
          onKeyDown={onKeyDown}
          placeholder={t("composerPlaceholder")}
          disabled={disabled || isPending}
          className="max-h-30min-h-11 flex-1 resize-none rounded-2xl border border-border bg-card px-4 py-2.5 text-sm text-foreground outline-none ring-primary/30 placeholder:text-muted-foreground focus:ring-2 disabled:opacity-50"
        />
        <button
          type="button"
          onClick={submit}
          disabled={!text.trim() || isPending || disabled}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label={t("send")}
        >
          {isPending ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="h-5 w-5"
              aria-hidden
            >
              <path d="M3.4 20.4 20.85 12.92a1 1 0 0 0 0-1.84L3.4 3.6a.5.5 0 0 0-.7.58l1.8 6.47a1 1 0 0 0 .8.72L14 12l-8.7.63a1 1 0 0 0-.8.72L2.7 19.82a.5.5 0 0 0 .7.58Z" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}