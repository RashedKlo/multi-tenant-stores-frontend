// features/support-chat/index.ts

// Reads
export { getConversations, getMessages } from "./api";

// Mutations
export {
  startConversation,
  sendMessage,
  markConversationRead,
} from "./actions";

// UI
export { ChatShell } from "./components/ChatShell";
export { ConversationListItem } from "./components/ConversationListItem";
export { Conversations, ConversationsSkeleton } from "./components";
export { ChatThread } from "./components/sections/ChatThread";
export { ChatThreadSkeleton } from "./components/sections/ChatThread/skeleton";
export { ConversationsLiveClient } from "./components/ConversationsLiveClient";
export { ChatThreadClient } from "./components/ChatThreadClient";
export { MessageBubble } from "./components/MessageBubble";
export { ChatComposer } from "./components/ChatComposer";
export { ConversationsEmpty } from "./components/ConversationsEmpty";

// Realtime
export { useSupportChatHub } from "./hooks/use-support-chat-hub";
export { SUPPORT_CHAT_HUB_PATH, SUPPORT_EVENTS } from "./constants";

// Types
export type {
  Conversation,
  ConversationSummary,
  Message,
  PagedMessages,
  NewMessageEvent,
  MessagesReadEvent,
  MessageDeletedEvent,
  ConversationDeletedEvent,
} from "./types";

export type {
  StartConversationInput,
  GetMessagesInput,
  SendMessageInput,
  MarkConversationReadInput,
} from "./schemas/support-chat.schema";