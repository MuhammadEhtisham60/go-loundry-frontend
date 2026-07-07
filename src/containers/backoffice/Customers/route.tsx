import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "../../__root";
import { AdminCustomers } from "./index";


export const adminCustomersRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/customers",
  head: () => ({ meta: [{ title: "Customers — GoLaundry Admin" }] }),
  component: AdminCustomers,
});
