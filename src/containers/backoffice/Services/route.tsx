import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "../../__root";
import { AdminServices } from "./Services";

export const adminServicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/services",
  head: () => ({ meta: [{ title: "Services & pricing — GoLaundry Admin" }] }),
  component: AdminServices,
});
