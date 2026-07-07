import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "../../__root";
import { AdminChats } from "./Chats";

export const adminChatsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin/chats",
  head: () => ({ meta: [{ title: "Support chats — GoLaundry Admin" }] }),
  component: AdminChats,
});
