import { privateAPI } from "./private";
import { publicAPI } from "./public";

export const serviceReducers = {
  [publicAPI.reducerPath]: publicAPI.reducer,
  [privateAPI.reducerPath]: privateAPI.reducer,
};

export const serviceMiddlewares = [publicAPI.middleware, privateAPI.middleware];

// ─── Re-export all service hooks ──────────────────────────────────────────────

// Public services
export * from "./public/auth";
export * from "./public/locations";
export * from "./public/catalog";

// Private services
export * from "./private/profile";
export * from "./private/addresses";
export * from "./private/orders";
export * from "./private/reviews";
export * from "./private/chats";
export * from "./private/notifications";
export * from "./private/dashboard";
export * from "./private/reports";
export * from "./private/customers";
export * from "./private/adminCatalog";
export * from "./private/warehouse";
