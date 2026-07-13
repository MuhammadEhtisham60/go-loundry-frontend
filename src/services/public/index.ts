import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "@/utils/constants";

export const publicAPI = createApi({
  reducerPath: "publicAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      return headers;
    },
  }),
  endpoints: () => ({}),
});

