import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "../../__root";
import { AdminRatings } from "./Ratings";

export const adminRatingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/ratings",
  head: () => ({ meta: [{ title: "Ratings — GoLaundry Admin" }] }),
  component: AdminRatings,
});
