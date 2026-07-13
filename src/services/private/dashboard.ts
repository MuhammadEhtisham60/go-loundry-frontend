import { privateAPI } from "./index";
import type { ApiResponse } from "../public/auth";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DashboardStats {
  order_volumes: {
    today: number;
    this_week: number;
    this_month: number;
  };
  orders_by_status: Record<string, number>;
  new_customers: {
    today: number;
    this_week: number;
    this_month: number;
  };
  open_support_chats: number;
  total_delivered_revenue: number;
}

// ─── Endpoints ────────────────────────────────────────────────────────────────

export const dashboardAPI = privateAPI.injectEndpoints({
  endpoints: (build) => ({
    /** GET /api/admin/dashboard/stats/ — Get operational statistics (Support/Admin only) */
    getDashboardStats: build.query<ApiResponse<DashboardStats>, void>({
      query: () => "/api/admin/dashboard/stats/",
      providesTags: ["Dashboard"],
    }),
  }),
  overrideExisting: false,
});

export const { useGetDashboardStatsQuery } = dashboardAPI;
