import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getToken, isTokenExpired } from "@/utils/utility-functions";
import { API_URL } from "@/utils/constants";
import { expireSession } from "@/store/slices/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    const token = getToken().access;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

interface AuthState {
  auth?: {
    isSessionExpired?: boolean;
    isAuthenticated?: boolean;
  };
}

const baseQueryWithReauth: typeof baseQuery = async (args, api, extraOptions) => {
  const state = api.getState() as AuthState;
  const token = getToken().access;

  // 1. Pre-emptive check: Block outgoing requests if the token is already expired
  if (token && isTokenExpired(token)) {
    if (!state.auth?.isSessionExpired) {
      api.dispatch(expireSession());
    }
    return {
      error: {
        status: 401,
        statusText: "Unauthorized",
        data: { detail: "Session expired" },
      },
    };
  }

  // 2. Execute the actual API call
  const result = await baseQuery(args, api, extraOptions);

  // 3. Intercept 401 Unauthorized responses
  if (result.error && result.error.status === 401) {
    if (state.auth?.isAuthenticated && !state.auth?.isSessionExpired) {
      api.dispatch(expireSession());
    }
  }

  return result;
};

export const privateAPI = createApi({
  reducerPath: "privateAPI",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "Profile",
    "Addresses",
    "Orders",
    "Reviews",
    "Conversations",
    "Messages",
    "Notifications",
    "Dashboard",
    "Reports",
    "Customers",
    "Services",
    "Warehouse",
    "Team",
    "Roles",
  ],
  endpoints: () => ({}),
});

