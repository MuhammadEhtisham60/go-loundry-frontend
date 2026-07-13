import { privateAPI } from "./index";
import type { ApiResponse } from "../public/auth";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Conversation {
  id: string;
  customer: {
    id?: string;
    email?: string;
    full_name?: string;
  };
  assigned_agent: {
    id?: string;
    email?: string;
    full_name?: string;
  } | null;
  is_resolved: boolean;
}

export interface Message {
  id: string;
  sender?: {
    id?: string;
    full_name?: string;
  };
  text?: string;
  image_url?: string;
  created_at?: string;
}

export interface SendMessagePayload {
  conversation_id: string;
  text?: string;
  image?: File;
}

// ─── Endpoints ────────────────────────────────────────────────────────────────

export const chatsAPI = privateAPI.injectEndpoints({
  endpoints: (build) => ({
    /** GET /api/chats/conversations/ — List support conversations */
    getConversations: build.query<ApiResponse<Conversation[]>, void>({
      query: () => "/api/chats/conversations/",
      providesTags: ["Conversations"],
    }),

    /** POST /api/chats/conversations/ — Start or retrieve active support session */
    startConversation: build.mutation<ApiResponse<Conversation>, void>({
      query: () => ({
        url: "/api/chats/conversations/",
        method: "POST",
      }),
      invalidatesTags: ["Conversations"],
    }),

    /** GET /api/chats/conversations/{id}/messages/ — Get messages in a conversation */
    getMessages: build.query<ApiResponse<Message[]>, string>({
      query: (conversationId) => `/api/chats/conversations/${conversationId}/messages/`,
      providesTags: (_result, _error, id) => [{ type: "Messages", id }],
    }),

    /** POST /api/chats/conversations/{id}/messages/ — Send a text or image message */
    sendMessage: build.mutation<
      ApiResponse<Message>,
      { conversationId: string; body: FormData | { text: string } }
    >({
      query: ({ conversationId, body }) => ({
        url: `/api/chats/conversations/${conversationId}/messages/`,
        method: "POST",
        body,
      }),
      invalidatesTags: (_result, _error, { conversationId }) => [
        { type: "Messages", id: conversationId },
      ],
    }),

    /** POST /api/chats/conversations/{id}/assign/ — Assign support agent (Support/Admin only) */
    assignAgent: build.mutation<ApiResponse<Conversation>, string>({
      query: (conversationId) => ({
        url: `/api/chats/conversations/${conversationId}/assign/`,
        method: "POST",
      }),
      invalidatesTags: ["Conversations"],
    }),

    /** POST /api/chats/conversations/{id}/resolve/ — Mark conversation resolved (Support/Admin only) */
    resolveConversation: build.mutation<ApiResponse<Conversation>, string>({
      query: (conversationId) => ({
        url: `/api/chats/conversations/${conversationId}/resolve/`,
        method: "POST",
      }),
      invalidatesTags: ["Conversations"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetConversationsQuery,
  useStartConversationMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
  useAssignAgentMutation,
  useResolveConversationMutation,
} = chatsAPI;
