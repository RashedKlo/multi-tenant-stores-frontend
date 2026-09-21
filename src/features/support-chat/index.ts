
export { getConversations, getMessages } from "./api";

// Mutations
export {
  startConversation,
  sendMessage,
  markConversationRead,
} from "./actions";

// UI
export { ChatShell } from "./components/ChatShell";
export {
  Conversations,
  ConversationsSkeleton,
} from "./components";
export { ChatThread } from "./components/sections/ChatThread";
export { ChatThreadSkeleton } from "./components/sections/ChatThread/skeleton";
export {
  ConversationsClient,
  ConversationsClient as ConversationsLiveClient,
} from "./components/sections/Conversations/ConversationsClient";
export { ConversationListItem } from "./components/sections/Conversations/ConversationListItem";
export { ConversationsEmpty } from "./components/sections/Conversations/empty";
export { ChatThreadClient } from "./components/sections/ChatThread/ChatThreadClient";
export { MessageBubble } from "./components/sections/ChatThread/MessageBubble";
export { ChatComposer } from "./components/sections/ChatThread/ChatComposer";

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