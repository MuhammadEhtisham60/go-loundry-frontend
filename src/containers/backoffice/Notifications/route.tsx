import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "../../__root";
import { AdminNotifs } from "./Notifications";

export const adminNotificationsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/notifications",
  head: () => ({ meta: [{ title: "Notifications — GoLaundry Admin" }] }),
  component: AdminNotifs,
});
