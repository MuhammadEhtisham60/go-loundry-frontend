import { privateAPI } from "./index";
import type { ApiResponse } from "../public/auth";

// ─── Types ────────────────────────────────────────────────────────────────────

export type NotificationType = "PUSH" | "SMS";

export interface NotificationLog {
  id: string;
  title: string;
  body: string;
  notification_type: NotificationType;
  is_sent: boolean;
  created_at: string;
}

// ─── Endpoints ────────────────────────────────────────────────────────────────

export const notificationsAPI = privateAPI.injectEndpoints({
  endpoints: (build) => ({
    /** GET /api/notifications/ — List SMS/FCM notification logs for the customer */
    getNotifications: build.query<ApiResponse<NotificationLog[]>, void>({
      query: () => "/api/notifications/",
      providesTags: ["Notifications"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetNotificationsQuery } = notificationsAPI;
