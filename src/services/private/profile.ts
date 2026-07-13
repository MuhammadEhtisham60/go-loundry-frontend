import { privateAPI } from "./index";
import type { ApiResponse, UserData } from "../public/auth";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface UpdateProfilePayload {
  full_name?: string;
  profile_photo?: File;
}

// ─── Endpoints ────────────────────────────────────────────────────────────────

export const profileAPI = privateAPI.injectEndpoints({
  endpoints: (build) => ({
    /** GET /api/auth/profile/ — Get current user profile */
    getProfile: build.query<ApiResponse<UserData>, void>({
      query: () => "/api/auth/profile/",
      providesTags: ["Profile"],
    }),

    /** PUT /api/auth/profile/ — Update full_name or avatar */
    updateProfile: build.mutation<ApiResponse<UserData>, FormData | UpdateProfilePayload>({
      query: (body) => ({
        url: "/api/auth/profile/",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
} = profileAPI;
