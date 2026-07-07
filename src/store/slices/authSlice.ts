import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  removeToken,
  setToken,
  getToken,
  setUser,
  getUser,
  removeUser,
  isTokenExpired,
} from "@/utils/utility-functions";

// Load tokens from localStorage on app start
const tokens = getToken();
const isExpired = tokens.access ? isTokenExpired(tokens.access) : false;

interface AuthState {
  isAuthenticated: boolean;
  userInfo: unknown;
  loggingOut: boolean;
  isSessionExpired: boolean;
}

const initialState: AuthState = {
  isAuthenticated: !!tokens.access, // if access token exists, user stays logged in
  userInfo: getUser(), // Load user from persistence
  loggingOut: false, // Track logout in progress to prevent AuthGuard redirect
  isSessionExpired: isExpired, // Initialized on load
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onLoggedIn: (
      state,
      { payload }: PayloadAction<{ access?: string; refresh?: string; user?: unknown }>,
    ) => {
      state.isAuthenticated = true;
      state.loggingOut = false;
      state.isSessionExpired = false;

      if (payload.access && payload.refresh) {
        setToken(payload.access, payload.refresh);
      }

      if (payload.user) {
        state.userInfo = payload.user;
        setUser(payload.user); // Persist user
      }
    },

    getUserDetail: (state, action: PayloadAction<unknown>) => {
      state.isAuthenticated = true;
      state.loggingOut = false;
      state.userInfo = action.payload;
      setUser(action.payload); // Persist detailed user info
    },

    startLogout: (state) => {
      state.loggingOut = true;
    },

    expireSession: (state) => {
      state.isSessionExpired = true;
    },

    onLoggedOut: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
      state.loggingOut = false;
      state.isSessionExpired = false; // Reset on logout
      removeToken();
      removeUser(); // Clear user persistence
    },
  },
});

export const { onLoggedIn, getUserDetail, onLoggedOut, startLogout, expireSession } =
  authSlice.actions;
export default authSlice.reducer;
