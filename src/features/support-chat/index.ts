// features/support-chat — public API

export {
  getConversations,
  getMessages,
  startConversation,
  sendMessage,
  markConversationRead,
} from "./api";

export { sendMessageAction } from "./actions/send-message.action";

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
export { useSupportChatHub } from "./hooks/use-support-chat-hub";
export type {
  ConversationSummary,
  Message,
  PagedMessages,
  NewMessageEvent,
} from "./types";

export { SUPPORT_CHAT_HUB_PATH, SUPPORT_EVENTS } from "./constants";
