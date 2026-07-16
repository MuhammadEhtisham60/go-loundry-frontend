import { privateAPI } from "./index";
import type { ApiResponse } from "../public/auth";
import type { LaundryService, ReorderPayload } from "../public/catalog";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface CreateServicePayload {
  name: string;
  description: string;
  unit: string;
  price: number;
  is_active?: boolean;
  display_order?: number;
}

// ─── Endpoints ────────────────────────────────────────────────────────────────

export const adminCatalogAPI = privateAPI.injectEndpoints({
  endpoints: (build) => ({
    /** GET /api/services/ — List all catalog services for admin (includes inactive) */
    getAdminServices: build.query<ApiResponse<LaundryService[]>, { include_inactive?: boolean } | void>({
      query: (params) => ({
        url: "/api/services/",
        params: params || { include_inactive: true },
      }),
      providesTags: ["Services"],
    }),

    /** GET /api/services/{id}/ — Get a single laundry service's details */
    getAdminServiceDetail: build.query<ApiResponse<LaundryService>, string>({
      query: (id) => `/api/services/${id}/`,
      providesTags: (result, error, id) => [{ type: "Services", id }],
    }),

    /** POST /api/services/ — Create a laundry service (Admin/Super Admin only) */
    createService: build.mutation<ApiResponse<LaundryService>, CreateServicePayload>({
      query: (body) => ({
        url: "/api/services/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Services"],
    }),

    /** PUT /api/services/{id}/ — Full update a laundry service */
    updateService: build.mutation<ApiResponse<LaundryService>, { id: string; body: CreateServicePayload }>({
      query: ({ id, body }) => ({
        url: `/api/services/${id}/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Services"],
    }),

    /** PATCH /api/services/{id}/ — Partial update a laundry service */
    partialUpdateService: build.mutation<ApiResponse<LaundryService>, { id: string; body: Partial<CreateServicePayload> }>({
      query: ({ id, body }) => ({
        url: `/api/services/${id}/`,
        method: "PATCH",
        body,
      }),
      invalidatesTags: ["Services"],
    }),

    /** DELETE /api/services/{id}/ — Soft-delete a laundry service */
    deleteService: build.mutation<ApiResponse, string>({
      query: (id) => ({
        url: `/api/services/${id}/`,
        method: "DELETE",
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
  useGetAdminServicesQuery,
  useGetAdminServiceDetailQuery,
  useCreateServiceMutation,
  useUpdateServiceMutation,
  usePartialUpdateServiceMutation,
  useDeleteServiceMutation,
  useReorderServicesMutation,
} = adminCatalogAPI;
