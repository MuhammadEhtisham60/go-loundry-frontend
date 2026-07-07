import { createRoute } from "@tanstack/react-router";
import { Route as rootRoute } from "../../__root";
import { Home } from "./Home";

export const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  head: () => ({
    meta: [
      { title: "GoLaundry — Premium Laundry Service in Pakistan" },
      {
        name: "description",
        content:
          "Schedule laundry pickup in minutes. Expert care, distance-fair delivery, cash on delivery. Lahore, Karachi & Islamabad.",
      },
      { property: "og:title", content: "GoLaundry — Clean, Delivered." },
      { property: "og:description", content: "Premium on-demand laundry service in Pakistan." },
    ],
  }),
  component: Home,
});
