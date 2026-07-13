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
}

export interface ListCustomersParams {
  role?: string;
  search?: string;
}

// ─── Endpoints ────────────────────────────────────────────────────────────────

export const customersAPI = privateAPI.injectEndpoints({
  endpoints: (build) => ({
    /** GET /api/admin/users/ — List users; filterable by role and search (Support/Admin only) */
    getCustomers: build.query<ApiResponse<Customer[]>, ListCustomersParams | void>({
      query: (params) => {
        const qs = new URLSearchParams();
        if (params?.role) qs.set("role", params.role);
        if (params?.search) qs.set("search", params.search);
        const str = qs.toString();
        return `/api/admin/users/${str ? `?${str}` : ""}`;
      },
      providesTags: ["Customers"],
    }),

    /** POST /api/admin/users/{id}/block/ — Block a customer account (Admin/Super Admin only) */
    blockUser: build.mutation<ApiResponse<{ id: string; is_blocked: boolean }>, string>({
      query: (id) => ({
        url: `/api/admin/users/${id}/block/`,
        method: "POST",
      }),
      invalidatesTags: ["Customers"],
    }),

    /** POST /api/admin/users/{id}/unblock/ — Unblock a customer account (Admin/Super Admin only) */
    unblockUser: build.mutation<ApiResponse<{ id: string; is_blocked: boolean }>, string>({
      query: (id) => ({
        url: `/api/admin/users/${id}/unblock/`,
        method: "POST",
      }),
      invalidatesTags: ["Customers"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCustomersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
} = customersAPI;
