import { privateAPI } from "./index";
import type { ApiResponse } from "../public/auth";

// ─── Types ────────────────────────────────────────────────────────────────────

export type OrderStatus =
  | "ORDER_PLACED"
  | "ORDER_CONFIRMED"
  | "PICKUP_ASSIGNED"
  | "PICKED_UP"
  | "IN_LAUNDRY"
  | "READY_FOR_DELIVERY"
  | "DELIVERY_ASSIGNED"
  | "DELIVERED"
  | "CANCELLED";

export type PickupSlot = "MORNING" | "AFTERNOON" | "EVENING";

export interface OrderItem {
  service_id: string;
  quantity: number;
}

export interface PlaceOrderPayload {
  pickup_address_id: string;
  pickup_date: string; // "YYYY-MM-DD"
  pickup_slot: PickupSlot;
  special_instructions?: string;
  items: OrderItem[];
}

export interface Order {
  id: string;
  status: OrderStatus;
  pickup_address?: string;
  address_line_snapshot?: string;
  latitude?: string;
  longitude?: string;
  distance_km?: string;
  delivery_charge?: string;
  total_services_amount?: string;
  total_amount?: string;
  pickup_date?: string;
  pickup_slot?: PickupSlot;
  payment_method?: string;
  rider_name?: string;
  rider_contact?: string;
  admin_notes?: string;
  special_instructions?: string;
  items?: Array<{
    service_id: string;
    service_name?: string;
    quantity: number;
    unit_price?: string;
    subtotal?: string;
  }>;
  created_at?: string;
}

export interface UpdateOrderStatusPayload {
  status: OrderStatus;
  rider_name?: string;
  rider_contact?: string;
  admin_notes?: string;
}

// ─── Endpoints ────────────────────────────────────────────────────────────────

export const ordersAPI = privateAPI.injectEndpoints({
  endpoints: (build) => ({
    /** GET /api/orders/ — List orders (own for customers, all for admins) */
    getOrders: build.query<ApiResponse<Order[]>, void>({
      query: () => "/api/orders/",
      providesTags: ["Orders"],
    }),

    /** POST /api/orders/ — Place a new laundry order */
    placeOrder: build.mutation<ApiResponse<Order>, PlaceOrderPayload>({
      query: (body) => ({
        url: "/api/orders/",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Orders"],
    }),

    /** GET /api/orders/{id}/ — Get a single order's details */
    getOrder: build.query<ApiResponse<Order>, string>({
      query: (id) => `/api/orders/${id}/`,
      providesTags: (_result, _error, id) => [{ type: "Orders", id }],
    }),

    /** POST /api/orders/{id}/cancel/ — Cancel an order */
    cancelOrder: build.mutation<ApiResponse<Order>, string>({
      query: (id) => ({
        url: `/api/orders/${id}/cancel/`,
        method: "POST",
      }),
      invalidatesTags: ["Orders"],
    }),

    /** PUT /api/orders/{id}/status/ — Update status and assign rider (Admin/Support only) */
    updateOrderStatus: build.mutation<
      ApiResponse<Order>,
      { id: string } & UpdateOrderStatusPayload
    >({
      query: ({ id, ...body }) => ({
        url: `/api/orders/${id}/status/`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Orders"],
    }),

    /** POST /api/orders/{id}/reorder/ — Pre-fill a new order from previous */
    reorder: build.mutation<ApiResponse<Order>, string>({
      query: (id) => ({
        url: `/api/orders/${id}/reorder/`,
        method: "POST",
      }),
      invalidatesTags: ["Orders"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetOrdersQuery,
  usePlaceOrderMutation,
  useGetOrderQuery,
  useCancelOrderMutation,
  useUpdateOrderStatusMutation,
  useReorderMutation,
} = ordersAPI;
