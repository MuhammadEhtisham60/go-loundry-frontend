import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "../../__root";
import { OrderPage } from "./Order";

export const orderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/order",
  head: () => ({ meta: [{ title: "Schedule pickup — GoLaundry" }] }),
  component: OrderPage,
});
