import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "../../__root";
import { AdminOrders } from "./Orders";

export const adminOrdersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/orders",
  head: () => ({ meta: [{ title: "Orders — GoLaundry Admin" }] }),
  component: AdminOrders,
});
