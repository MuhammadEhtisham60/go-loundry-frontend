import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "../../__root";
import { AdminZones } from "./Zones";

export const adminZonesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/zones",
  head: () => ({ meta: [{ title: "Zones & warehouse — GoLaundry Admin" }] }),
  component: AdminZones,
});
