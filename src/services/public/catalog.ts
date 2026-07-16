import { publicAPI } from "./index";
import type { ApiResponse } from "./auth";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LaundryService {
  id: string;
  name: string;
  description: string;
  unit: string;
  unit_display?: string;
  price: string;
  is_active: boolean;
  display_order: number;
  order_sequence?: number; // legacy fallback
  created_at?: string;
  updated_at?: string;
}

export interface ReorderSequenceItem {
  id: string;
  display_order: number;
}

export interface ReorderPayload {
  services: ReorderSequenceItem[];
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
