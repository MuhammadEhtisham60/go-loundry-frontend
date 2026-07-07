import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "../../__root";
import { OrdersListPage } from "./OrdersIndex";

export const ordersIndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders",
  head: () => ({ meta: [{ title: "Your orders — GoLaundry" }] }),
  component: OrdersListPage,
});
