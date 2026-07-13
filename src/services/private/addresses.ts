import { privateAPI } from "./index";
import type { ApiResponse } from "../public/auth";

// ─── Types ────────────────────────────────────────────────────────────────────

export type AddressType = "HOME" | "OFFICE" | "OTHER";

export interface Address {
  id: string;
  address_type: AddressType;
  address_line: string;
  latitude: string;
  longitude: string;
  is_default: boolean;
}

export interface CreateAddressPayload {
  address_type: AddressType;
  address_line: string;
  latitude: number;
  longitude: number;
  is_default?: boolean;
}

// ─── Endpoints ────────────────────────────────────────────────────────────────

export const addressesAPI = privateAPI.injectEndpoints({
  endpoints: (build) => ({
    /** GET /api/addresses/ — List customer addresses */
    getAddresses: build.query<ApiResponse<Address[]>, void>({
      query: () => "/api/addresses/",
      providesTags: ["Addresses"],
    }),

    /** POST /api/addresses/ — Add a new address */
    createAddress: build.mutation<ApiResponse<Address>, CreateAddressPayload>({
      query: (body) => ({
        url: "/api/addresses/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Addresses"],
    }),

    /** DELETE /api/addresses/{id}/ — Delete an address */
    deleteAddress: build.mutation<ApiResponse, string>({
      query: (id) => ({
        url: `/api/addresses/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["Addresses"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetAddressesQuery,
  useCreateAddressMutation,
  useDeleteAddressMutation,
} = addressesAPI;
