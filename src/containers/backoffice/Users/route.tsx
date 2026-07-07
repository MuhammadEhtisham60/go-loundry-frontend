import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "../../__root";
import { AdminUsers } from "./Users";

export const adminUsersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/users",
  head: () => ({ meta: [{ title: "Users & roles — GoLaundry Admin" }] }),
  component: AdminUsers,
});
