import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import netlify from "@netlify/vite-plugin-tanstack-start";
import path from "path";

function customManifestPlugin() {
  return {
    name: "custom-manifest-plugin",
    configResolved() {
      const root = process.cwd();
      const manifest = {
        __root__: {
          filePath: path.resolve(root, "src/containers/__root.tsx"),
          children: [
            "/",
            "/auth",
            "/chat",
            "/order",
            "/orders",
            "/orders/$id",
            "/profile",
            "/services",
            "/about",
            "/contact",
            "/admin",
            "/admin/chats",
            "/admin/customers",
            "/admin/notifications",
            "/admin/orders",
            "/admin/ratings",
            "/admin/reports",
            "/admin/services",
            "/admin/settings",
            "/admin/users",
            "/admin/zones",
          ],
        },
        "/": { filePath: path.resolve(root, "src/containers/website/Home/route.tsx") },
        "/auth": { filePath: path.resolve(root, "src/containers/website/Auth/route.tsx") },
        "/chat": { filePath: path.resolve(root, "src/containers/website/Chat/route.tsx") },
        "/order": { filePath: path.resolve(root, "src/containers/website/Order/route.tsx") },
        "/orders": { filePath: path.resolve(root, "src/containers/website/Orders/route.tsx") },
        "/orders/$id": {
          filePath: path.resolve(root, "src/containers/website/Orders/detailsRoute.tsx"),
        },
        "/profile": { filePath: path.resolve(root, "src/containers/website/Profile/route.tsx") },
        "/services": { filePath: path.resolve(root, "src/containers/website/Services/route.tsx") },
        "/about": { filePath: path.resolve(root, "src/containers/website/About/route.tsx") },
        "/contact": { filePath: path.resolve(root, "src/containers/website/Contact/route.tsx") },
        "/admin": { filePath: path.resolve(root, "src/containers/backoffice/Dashboard/route.tsx") },
        "/admin/chats": {
          filePath: path.resolve(root, "src/containers/backoffice/Chats/route.tsx"),
        },
        "/admin/customers": {
          filePath: path.resolve(root, "src/containers/backoffice/Customers/route.tsx"),
        },
        "/admin/notifications": {
          filePath: path.resolve(root, "src/containers/backoffice/Notifications/route.tsx"),
        },
        "/admin/orders": {
          filePath: path.resolve(root, "src/containers/backoffice/Orders/route.tsx"),
        },
        "/admin/ratings": {
          filePath: path.resolve(root, "src/containers/backoffice/Ratings/route.tsx"),
        },
        "/admin/reports": {
          filePath: path.resolve(root, "src/containers/backoffice/Reports/route.tsx"),
        },
        "/admin/services": {
          filePath: path.resolve(root, "src/containers/backoffice/Services/route.tsx"),
        },
        "/admin/settings": {
          filePath: path.resolve(root, "src/containers/backoffice/Settings/route.tsx"),
        },
        "/admin/users": {
          filePath: path.resolve(root, "src/containers/backoffice/Users/route.tsx"),
        },
        "/admin/zones": {
          filePath: path.resolve(root, "src/containers/backoffice/Zones/route.tsx"),
        },
      };
      Object.assign(globalThis, { TSS_ROUTES_MANIFEST: manifest });
    },
  };
}

export default defineConfig({
  server: {
    port: 3008,
  },
  css: {
    transformer: "lightningcss",
  },
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "./src"),
    },
  },
  plugins: [
    tsconfigPaths(),
    tailwindcss(),
    tanstackStart({
      server: { entry: "index" },
      router: {
        entry: "route/router",
        routesDirectory: "containers",
        enableRouteGeneration: false,
      },
    }),
    react(),
    netlify(),
    customManifestPlugin(),
  ],
});
