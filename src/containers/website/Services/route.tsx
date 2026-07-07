import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "../../__root";
import { ServicesPage } from "./Services";

export const servicesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/services",
  head: () => ({ meta: [{ title: "Services — GoLaundry" }] }),
  component: ServicesPage,
});
