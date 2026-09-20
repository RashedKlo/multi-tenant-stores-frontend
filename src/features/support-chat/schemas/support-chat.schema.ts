// features/support-chat/schemas/support-chat.schema.ts
import { z } from "zod";

export const startConversationSchema = z.object({
  tenantId: z.string().trim().min(1, "errors.validation"),
});

export const getMessagesSchema = z.object({
  conversationId: z.string().trim().min(1, "errors.validation"),
  page: z.number().int().min(1).optional().default(1),
  pageSize: z.number().int().min(1).max(100).optional().default(30),
});

export const sendMessageSchema = z.object({
  conversationId: z.string().trim().min(1, "errors.validation"),
  body: z
    .string()
    .trim()
    .min(1, "errors.validation")
    .max(2000, "errors.validation"),
});

export const markConversationReadSchema = z.object({
  conversationId: z.string().trim().min(1, "errors.validation"),
});

export type StartConversationInput = z.infer<typeof startConversationSchema>;
export type GetMessagesInput = z.infer<typeof getMessagesSchema>;
export type SendMessageInput = z.infer<typeof sendMessageSchema>;
export type MarkConversationReadInput = z.infer<
  typeof markConversationReadSchema
>;