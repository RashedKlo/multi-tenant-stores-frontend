// features/support-chat/types/index.ts
export type Conversation = {
  id: string;
  tenantId: string;
  tenantName: string;
  customerId: string;
  status: string;
  createdAt: string;
  lastMessageAt: string;
};

export type ConversationSummary = {
  id: string;
  tenantId: string;
  tenantName: string;
  status: string;
  lastMessageBody: string | null;
  lastMessageAt: string;
  unreadCount: number;
};

export type Message = {
  id: string;
  conversationId: string;
  senderType: string; // "Customer" | "System" | future agent types
  senderId: string;
  body: string;
  isRead: boolean;
  createdAt: string;
};

export type PagedMessages = {
  items: Message[];
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

/** SignalR: NewMessage */
export type NewMessageEvent = Message;

/** SignalR: MessagesRead */
export type MessagesReadEvent = {
  conversationId: string;
  readAt: string;
};

/** SignalR: MessageDeleted */
export type MessageDeletedEvent = {
  conversationId: string;
  messageId: string;
};

/** SignalR: ConversationDeleted */
export type ConversationDeletedEvent = {
  conversationId: string;
};