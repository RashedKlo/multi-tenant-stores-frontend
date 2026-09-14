// features/support-chat/constants/index.ts

export const SUPPORT_CHAT_HUB_PATH = "/hubs/support-chat";

export const SUPPORT_EVENTS = {
  NewMessage: "NewMessage",
  MessagesRead: "MessagesRead",
  MessageDeleted: "MessageDeleted",
  ConversationDeleted: "ConversationDeleted",
} as const;

export const SENDER_CUSTOMER = "Customer";
