import { privateAPI } from "./index";
import type { ApiResponse } from "../public/auth";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface Review {
  id: string;
  order: string;
  rating: number; // 1–5
  remarks?: string;
  created_at?: string;
}

export interface SubmitReviewPayload {
  order_id: string;
  rating: number;
  remarks?: string;
}

// ─── Endpoints ────────────────────────────────────────────────────────────────

export const reviewsAPI = privateAPI.injectEndpoints({
  endpoints: (build) => ({
    /** GET /api/reviews/ — List reviews (own for customers, all for admins) */
    getReviews: build.query<ApiResponse<Review[]>, void>({
      query: () => "/api/reviews/",
      providesTags: ["Reviews"],
    }),

    /** POST /api/reviews/ — Submit a rating for a completed order */
    submitReview: build.mutation<ApiResponse<Review>, SubmitReviewPayload>({
      query: (body) => ({
        url: "/api/reviews/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Reviews"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetReviewsQuery,
  useSubmitReviewMutation,
} = reviewsAPI;
