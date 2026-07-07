import { Route as rootRoute } from "@/containers/__root";
import { publicRoutes } from "./public";
import { privateRoutes } from "./private";

const children = [...publicRoutes, ...privateRoutes];

export const routeTree = rootRoute.addChildren(children);
