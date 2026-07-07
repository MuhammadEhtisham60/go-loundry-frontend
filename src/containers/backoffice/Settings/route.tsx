import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "../../__root";
import { AdminSettings } from "./Settings";

export const adminSettingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/settings",
  head: () => ({ meta: [{ title: "Settings — GoLaundry Admin" }] }),
  component: AdminSettings,
});
