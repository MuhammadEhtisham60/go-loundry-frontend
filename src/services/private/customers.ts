import { privateAPI } from "./index";
import type { ApiResponse } from "../public/auth";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Customer {
  id: string;
  email?: string;
  phone?: string;
  full_name: string;
  role?: string;
  is_blocked: boolean;
  profile_photo?: string | null;
  created_at?: string;
}

export interface ListCustomersParams {
  search?: string;
  is_blocked?: boolean;
}

// ─── Endpoints ────────────────────────────────────────────────────────────────

export const customersAPI = privateAPI.injectEndpoints({
  endpoints: (build) => ({
    /** GET /api/users/ — List users; filterable by search (Support/Admin only) */
    getCustomers: build.query<ApiResponse<Customer[]>, ListCustomersParams | void>({
      query: (params) => {
        const qs = new URLSearchParams();
        if (params?.search) qs.set("search", params.search);
        if (params?.is_blocked !== undefined) {
          qs.set("is_blocked", String(params.is_blocked));
        }
        const str = qs.toString();
        return `/api/users/${str ? `?${str}` : ""}`;
      },
      providesTags: ["Customers"],
    }),

    /** POST /api/users/{id}/block/ — Block or unblock a customer account (Admin/Super Admin only) */
    blockUser: build.mutation<ApiResponse<Customer>, { id: string; is_blocked: boolean }>({
      query: ({ id, is_blocked }) => ({
        url: `/api/users/${id}/block/`,
        method: "POST",
        body: { is_blocked },
      }),
      invalidatesTags: ["Customers"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCustomersQuery,
  useBlockUserMutation,
} = customersAPI;
