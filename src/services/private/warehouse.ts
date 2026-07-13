import { privateAPI } from "./index";
import type { ApiResponse } from "../public/auth";
import type { WarehouseLocation } from "../public/locations";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UpdateWarehousePayload {
  latitude: number;
  longitude: number;
  max_service_radius_km: number;
}

// ─── Endpoints ────────────────────────────────────────────────────────────────

export const warehouseAPI = privateAPI.injectEndpoints({
  endpoints: (build) => ({
    /** PUT /api/locations/warehouse/ — Update warehouse location/radius (Super Admin only) */
    updateWarehouse: build.mutation<ApiResponse<WarehouseLocation>, UpdateWarehousePayload>({
      query: (body) => ({
        url: "/api/locations/warehouse/",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Warehouse"],
    }),
  }),
  overrideExisting: false,
});

export const { useUpdateWarehouseMutation } = warehouseAPI;
