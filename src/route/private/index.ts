import { chatRoute } from "@/containers/website/Chat/route";
import { orderRoute } from "@/containers/website/Order/route";
import { ordersIndexRoute } from "@/containers/website/Orders/route";
import { ordersIdRoute } from "@/containers/website/Orders/detailsRoute";
import { profileRoute } from "@/containers/website/Profile/route";

// Backoffice/admin routes
import { dashboardRoute } from "@/containers/backoffice/Dashboard/route";
import { adminChatsRoute } from "@/containers/backoffice/Chats/route";
import { adminCustomersRoute } from "@/containers/backoffice/Customers/route";
import { adminNotificationsRoute } from "@/containers/backoffice/Notifications/route";
import { adminOrdersRoute } from "@/containers/backoffice/Orders/route";
import { adminRatingsRoute } from "@/containers/backoffice/Ratings/route";
import { adminReportsRoute } from "@/containers/backoffice/Reports/route";
import { adminServicesRoute } from "@/containers/backoffice/Services/route";
import { adminSettingsRoute } from "@/containers/backoffice/Settings/route";
import { adminUsersRoute } from "@/containers/backoffice/Users/route";
import { adminZonesRoute } from "@/containers/backoffice/Zones/route";

export const privateRoutes = [
  chatRoute,
  orderRoute,
  ordersIndexRoute,
  ordersIdRoute,
  profileRoute,
  dashboardRoute,
  adminChatsRoute,
  adminCustomersRoute,
  adminNotificationsRoute,
  adminOrdersRoute,
  adminRatingsRoute,
  adminReportsRoute,
  adminServicesRoute,
  adminSettingsRoute,
  adminUsersRoute,
  adminZonesRoute,
];
