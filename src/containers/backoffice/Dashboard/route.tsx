import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "../../__root";
import { AdminDashboard } from "./Dashboard";

export const dashboardRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  head: () => ({ meta: [{ title: "Dashboard — GoLaundry Admin" }] }),
  component: AdminDashboard,
});
