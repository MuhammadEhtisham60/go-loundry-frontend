import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "../../__root";
import { ChatPage } from "./Chat";

export const chatRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/chat",
  head: () => ({ meta: [{ title: "Support chat — GoLaundry" }] }),
  component: ChatPage,
});
