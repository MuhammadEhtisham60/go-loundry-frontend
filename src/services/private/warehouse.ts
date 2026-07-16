import { privateAPI } from "./index";
import type { ApiResponse } from "../public/auth";
import type { WarehouseLocation } from "../public/locations";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UpdateWarehousePayload {
  latitude: number;
  longitude: number;
  max_service_radius_km: number;
  address: string;
}

export interface DeliveryTier {
  id?: number;
  from: number;
  to: number;
  charge: number;
}

// ─── Endpoints ────────────────────────────────────────────────────────────────

export const warehouseAPI = privateAPI.injectEndpoints({
  endpoints: (build) => ({
    /** GET /api/locations/warehouse/ — List all warehouses */
    getWarehouses: build.query<ApiResponse<WarehouseLocation[]>, void>({
      query: () => "/api/locations/warehouse/",
      providesTags: ["Warehouse"],
    }),

    /** GET /api/locations/warehouse/{id}/ — Get warehouse details */
    getWarehouseDetail: build.query<ApiResponse<WarehouseLocation>, string | number>({
      query: (id) => `/api/locations/warehouse/${id}/`,
      providesTags: (result, error, id) => [{ type: "Warehouse", id }],
    }),

    /** POST /api/locations/warehouse/ — Create warehouse settings (Super Admin only) */
    createWarehouse: build.mutation<ApiResponse<WarehouseLocation>, UpdateWarehousePayload>({
      query: (body) => ({
        url: "/api/locations/warehouse/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Warehouse"],
    }),

    /** PUT /api/locations/warehouse/{id}/ — Update warehouse location/radius (Super Admin only) */
    updateWarehouse: build.mutation<ApiResponse<WarehouseLocation>, { id: string | number; payload: UpdateWarehousePayload }>({
      query: ({ id, payload }) => ({
        url: `/api/locations/warehouse/${id}/`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "Warehouse", id },
        "Warehouse",
      ],
    }),

    /** DELETE /api/locations/warehouse/{id}/ — Delete warehouse settings (Super Admin only) */
    deleteWarehouse: build.mutation<ApiResponse<void>, string | number>({
      query: (id) => ({
        url: `/api/locations/warehouse/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Warehouse"],
    }),

    /** GET /api/locations/tiers/ — List delivery tiers */
    getTiers: build.query<ApiResponse<DeliveryTier[]>, void>({
      query: () => "/api/locations/tiers/",
      providesTags: ["Warehouse"],
    }),

    /** PUT /api/locations/tiers/ — Save all delivery tiers */
    saveTiers: build.mutation<ApiResponse<DeliveryTier[]>, DeliveryTier[]>({
      query: (body) => ({
        url: "/api/locations/tiers/",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Warehouse"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetWarehousesQuery,
  useGetWarehouseDetailQuery,
  useCreateWarehouseMutation,
  useUpdateWarehouseMutation,
  useDeleteWarehouseMutation,
  useGetTiersQuery,
  useSaveTiersMutation,
} = warehouseAPI;
