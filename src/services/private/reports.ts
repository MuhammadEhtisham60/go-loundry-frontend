import { privateAPI } from "./index";
import type { ApiResponse } from "../public/auth";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface DateRangeParams {
  date_from?: string; // "YYYY-MM-DD"
  date_to?: string;   // "YYYY-MM-DD"
}

export interface OrdersReport {
  date_range: { from: string; to: string };
  total_orders: number;
  status_breakdown: Record<string, number>;
}

export interface RevenueReport {
  date_range: { from: string; to: string };
  total_revenue: number;
  total_delivery_charges: number;
  total_services_revenue: number;
}

export interface CustomersReport {
  date_range: { from: string; to: string };
  total_customers: number;
  new_customers: number;
}

export interface ServicePopularityItem {
  service_id: string;
  service_name: string;
  total_orders: number;
  total_quantity: number;
  total_revenue: number;
}

export interface ZoneReport {
  zone_band: string;
  total_orders: number;
  estimated_revenue: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const toQueryString = (params?: DateRangeParams) => {
  if (!params) return "";
  const qs = new URLSearchParams();
  if (params.date_from) qs.set("date_from", params.date_from);
  if (params.date_to) qs.set("date_to", params.date_to);
  const str = qs.toString();
  return str ? `?${str}` : "";
};

// ─── Endpoints ────────────────────────────────────────────────────────────────

export const reportsAPI = privateAPI.injectEndpoints({
  endpoints: (build) => ({
    /** GET /api/admin/reports/orders/ — Orders volume report */
    getOrdersReport: build.query<ApiResponse<OrdersReport>, DateRangeParams | void>({
      query: (params) => `/api/admin/reports/orders/${toQueryString(params ?? undefined)}`,
      providesTags: ["Reports"],
    }),

    /** GET /api/admin/reports/revenue/ — Financial revenue report */
    getRevenueReport: build.query<ApiResponse<RevenueReport>, DateRangeParams | void>({
      query: (params) => `/api/admin/reports/revenue/${toQueryString(params ?? undefined)}`,
      providesTags: ["Reports"],
    }),

    /** GET /api/admin/reports/customers/ — Customer signup report */
    getCustomersReport: build.query<ApiResponse<CustomersReport>, DateRangeParams | void>({
      query: (params) => `/api/admin/reports/customers/${toQueryString(params ?? undefined)}`,
      providesTags: ["Reports"],
    }),

    /** GET /api/admin/reports/services/ — Service popularity report */
    getServicesReport: build.query<ApiResponse<ServicePopularityItem[]>, void>({
      query: () => "/api/admin/reports/services/",
      providesTags: ["Reports"],
    }),

    /** GET /api/admin/reports/zones/ — Geographical zone report */
    getZonesReport: build.query<ApiResponse<ZoneReport[]>, void>({
      query: () => "/api/admin/reports/zones/",
      providesTags: ["Reports"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetOrdersReportQuery,
  useGetRevenueReportQuery,
  useGetCustomersReportQuery,
  useGetServicesReportQuery,
  useGetZonesReportQuery,
} = reportsAPI;
