import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "../../__root";
import { AuthPage } from "./Auth";

export const authRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/auth",
  head: () => ({ meta: [{ title: "Sign in — GoLaundry" }] }),
  component: AuthPage,
});
