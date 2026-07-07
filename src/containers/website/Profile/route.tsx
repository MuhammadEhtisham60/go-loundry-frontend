import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "../../__root";
import { ProfilePage } from "./Profile";

export const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  head: () => ({ meta: [{ title: "Profile — GoLaundry" }] }),
  component: ProfilePage,
});
