import { publicAPI } from "./index";
import type { ApiResponse } from "./auth";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LaundryService {
  id: string;
  name: string;
  description: string;
  price: string;
  order_sequence: number;
  is_active?: boolean;
}

export interface ReorderSequenceItem {
  service_id: string;
  order_sequence: number;
}

export interface ReorderPayload {
  sequences: ReorderSequenceItem[];
}

// ─── Endpoints ────────────────────────────────────────────────────────────────

export const catalogAPI = publicAPI.injectEndpoints({
  endpoints: (build) => ({
    /** GET /api/services/ — List all active laundry services */
    getServices: build.query<ApiResponse<LaundryService[]>, void>({
      query: () => "/api/services/",
    }),
  }),
  overrideExisting: false,
});

export const { useGetServicesQuery } = catalogAPI;
