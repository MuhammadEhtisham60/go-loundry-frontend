import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "../../__root";
import { AdminWarehouse } from "./Warehouse";
import { WarehouseDetail } from "./WarehouseDetail";

export const adminWarehouseRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/warehouse",
  head: () => ({ meta: [{ title: "Warehouse & delivery tiers — GoLaundry Admin" }] }),
  component: AdminWarehouse,
});

export const adminWarehouseDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/warehouse/$warehouseId",
  head: () => ({ meta: [{ title: "Warehouse Details — GoLaundry Admin" }] }),
  component: WarehouseDetail,
});
