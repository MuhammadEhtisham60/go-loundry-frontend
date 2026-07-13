import { privateAPI } from "./index";
import type { ApiResponse } from "../public/auth";
import type { LaundryService, ReorderPayload } from "../public/catalog";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CreateServicePayload {
  name: string;
  description: string;
  price: number;
  order_sequence?: number;
}

// ─── Endpoints ────────────────────────────────────────────────────────────────

export const adminCatalogAPI = privateAPI.injectEndpoints({
  endpoints: (build) => ({
    /** POST /api/services/ — Create a laundry service (Admin/Super Admin only) */
    createService: build.mutation<ApiResponse<LaundryService>, CreateServicePayload>({
      query: (body) => ({
        url: "/api/services/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Services"],
    }),

    /** POST /api/services/reorder/ — Reorder services sequence (Admin/Super Admin only) */
    reorderServices: build.mutation<ApiResponse, ReorderPayload>({
      query: (body) => ({
        url: "/api/services/reorder/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Services"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateServiceMutation,
  useReorderServicesMutation,
} = adminCatalogAPI;
