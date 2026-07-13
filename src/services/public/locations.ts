import { publicAPI } from "./index";
import type { ApiResponse } from "./auth";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ValidateAreaPayload {
  latitude: number;
  longitude: number;
}

export interface ValidateAreaData {
  is_valid: boolean;
  distance_km: number;
  delivery_charge: number;
}

export interface WarehouseLocation {
  id: string;
  latitude: string;
  longitude: string;
  max_service_radius_km: string;
}

// ─── Endpoints ────────────────────────────────────────────────────────────────

export const locationsAPI = publicAPI.injectEndpoints({
  endpoints: (build) => ({
    /** GET /api/locations/warehouse/ — Get warehouse location details */
    getWarehouse: build.query<ApiResponse<WarehouseLocation>, void>({
      query: () => "/api/locations/warehouse/",
    }),

    /** POST /api/locations/validate-area/ — Check if coordinates are in serviced area */
    validateArea: build.mutation<ApiResponse<ValidateAreaData>, ValidateAreaPayload>({
      query: (body) => ({
        url: "/api/locations/validate-area/",
        method: "POST",
        body,
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetWarehouseQuery,
  useValidateAreaMutation,
} = locationsAPI;
