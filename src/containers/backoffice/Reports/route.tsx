import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "../../__root";
import { AdminReports } from "./Reports";

export const adminReportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/reports",
  head: () => ({ meta: [{ title: "Reports & analytics — GoLaundry Admin" }] }),
  component: AdminReports,
});
