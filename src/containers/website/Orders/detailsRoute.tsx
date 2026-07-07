import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "../../__root";
import { OrderDetail } from "./OrderDetails";

export const ordersIdRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/orders/$id",
  head: () => ({ meta: [{ title: "Order tracking — GoLaundry" }] }),
  component: OrderDetail,
});
