import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/utils/constants";

export const publicAPI = createApi({
  reducerPath: "publicAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      if (typeof window !== "undefined" && window.location.hostname !== "localhost") {
        headers.set("X-Tenant-Hostname", window.location.hostname);
      }
      return headers;
    },
    credentials:
      typeof window !== "undefined" && window.location.hostname === "localhost"
        ? "same-origin"
        : "include",
  }),
  endpoints: () => ({}),
});
