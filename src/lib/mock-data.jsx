// @ts-nocheck
// Mock data for GoLaundry app — used across customer and admin views.

export const SERVICES = [
  {
    id: "iron",
    name: "Iron / Press",
    desc: "Pressing and ironing of garments",
    unit: "piece",
    price: 60,
    active: true,
    popular: true,
  },
  {
    id: "wash-iron",
    name: "Wash & Iron",
    desc: "Machine wash followed by ironing",
    unit: "piece",
    price: 120,
    active: true,
    popular: true,
  },
  {
    id: "wash-fold",
    name: "Wash & Fold",
    desc: "Machine wash, dry, and fold",
    unit: "kg",
    price: 250,
    active: true,
    popular: true,
  },
  {
    id: "dry-clean",
    name: "Dry Cleaning",
    desc: "Chemical cleaning for delicate fabrics",
    unit: "piece",
    price: 350,
    active: true,
  },
  {
    id: "starch",
    name: "Starching",
    desc: "Starch treatment for shalwar kameez and kurtas",
    unit: "piece",
    price: 80,
    active: true,
  },
  {
    id: "blanket",
    name: "Blanket / Duvet Wash",
    desc: "Heavy item washing and drying",
    unit: "piece",
    price: 600,
    active: true,
  },
  {
    id: "curtain",
    name: "Curtain Cleaning",
    desc: "Washing and steam pressing of curtains",
    unit: "pair",
    price: 800,
    active: true,
  },
  {
    id: "shoe",
    name: "Shoe Cleaning",
    desc: "Deep cleaning and polish",
    unit: "pair",
    price: 450,
    active: true,
  },
  {
    id: "saree",
    name: "Saree / Lehenga Care",
    desc: "Delicate hand wash and steam press",
    unit: "piece",
    price: 550,
    active: true,
  },
  {
    id: "stain",
    name: "Stain Removal",
    desc: "Targeted spot and stain treatment",
    unit: "piece",
    price: 200,
    active: true,
  },
  {
    id: "express",
    name: "Express Service",
    desc: "Same-day turnaround surcharge",
    unit: "order",
    price: 300,
    active: true,
  },
];

export const ORDER_STATUSES = [
  { key: "placed", label: "Order Placed", tone: "warning" },
  { key: "confirmed", label: "Confirmed", tone: "warning" },
  { key: "pickup-scheduled", label: "Pickup Scheduled", tone: "warning" },
  { key: "picked-up", label: "Picked Up", tone: "warning" },
  { key: "in-process", label: "In Process", tone: "warning" },
  { key: "ready", label: "Ready for Delivery", tone: "warning" },
  { key: "out-for-delivery", label: "Out for Delivery", tone: "warning" },
  { key: "delivered", label: "Delivered", tone: "success" },
  { key: "cancelled", label: "Cancelled", tone: "destructive" },
];

export const DELIVERY_TIERS = [
  { from: 0, to: 5, charge: 0, label: "0–5 KM" },
  { from: 5, to: 10, charge: 100, label: "5–10 KM" },
  { from: 10, to: 15, charge: 200, label: "10–15 KM" },
];

export const MAX_RADIUS_KM = 15;
export const MIN_ORDER = 500;

export function chargeForDistance(km) {
  const tier = DELIVERY_TIERS.find((t) => km >= t.from && km < t.to);
  return tier ? tier.charge : 350;
}

export const TIME_SLOTS = [
  { id: "morning", label: "Morning", time: "9:00 AM – 12:00 PM" },
  { id: "afternoon", label: "Afternoon", time: "12:00 PM – 4:00 PM" },
  { id: "evening", label: "Evening", time: "4:00 PM – 8:00 PM" },
];

export const ADDRESSES = [
  {
    id: "a1",
    label: "Home",
    line: "House 24-B, Street 7, DHA Phase 5",
    city: "Lahore",
    lat: 31.4697,
    lng: 74.4112,
    km: 4.2,
  },
  {
    id: "a2",
    label: "Office",
    line: "Plot 102, Gulberg III, MM Alam Road",
    city: "Lahore",
    lat: 31.5132,
    lng: 74.342,
    km: 8.7,
  },
  {
    id: "a3",
    label: "Other",
    line: "Apt 5, Eden Towers, Model Town",
    city: "Lahore",
    lat: 31.4836,
    lng: 74.3231,
    km: 11.3,
  },
];

const sampleItems = [
  { serviceId: "wash-fold", name: "Wash & Fold", qty: 4, unit: "kg", price: 250 },
  { serviceId: "iron", name: "Iron / Press", qty: 6, unit: "piece", price: 60 },
];

export const ORDERS = [
  {
    id: "GL-10247",
    customerId: "c1",
    customerName: "Ayesha Khan",
    phone: "+92 300 1234567",
    address: ADDRESSES[0],
    items: sampleItems,
    deliveryCharge: 0,
    total: 1360,
    slot: "Afternoon",
    placedAt: "2026-06-22T10:14:00Z",
    status: "in-process",
    payment: "COD",
    notes: "Please be gentle with embroidery.",
  },
  {
    id: "GL-10246",
    customerId: "c2",
    customerName: "Hamza Iqbal",
    phone: "+92 321 7654321",
    address: ADDRESSES[1],
    items: [{ serviceId: "dry-clean", name: "Dry Cleaning", qty: 3, unit: "piece", price: 350 }],
    deliveryCharge: 100,
    total: 1150,
    slot: "Morning",
    placedAt: "2026-06-22T08:02:00Z",
    status: "out-for-delivery",
    payment: "COD",
  },
  {
    id: "GL-10245",
    customerId: "c3",
    customerName: "Sana Riaz",
    phone: "+92 333 9876543",
    address: ADDRESSES[2],
    items: [{ serviceId: "blanket", name: "Blanket Wash", qty: 2, unit: "piece", price: 600 }],
    deliveryCharge: 200,
    total: 1400,
    slot: "Evening",
    placedAt: "2026-06-21T16:30:00Z",
    status: "delivered",
    payment: "COD",
    rating: 5,
  },
  {
    id: "GL-10244",
    customerId: "c1",
    customerName: "Ayesha Khan",
    phone: "+92 300 1234567",
    address: ADDRESSES[0],
    items: [{ serviceId: "wash-iron", name: "Wash & Iron", qty: 8, unit: "piece", price: 120 }],
    deliveryCharge: 0,
    total: 960,
    slot: "Morning",
    placedAt: "2026-06-20T09:15:00Z",
    status: "delivered",
    payment: "COD",
    rating: 4,
  },
  {
    id: "GL-10243",
    customerId: "c4",
    customerName: "Bilal Ahmed",
    phone: "+92 345 1112233",
    address: ADDRESSES[1],
    items: [{ serviceId: "shoe", name: "Shoe Cleaning", qty: 2, unit: "pair", price: 450 }],
    deliveryCharge: 100,
    total: 1000,
    slot: "Afternoon",
    placedAt: "2026-06-19T14:00:00Z",
    status: "cancelled",
    payment: "COD",
  },
  {
    id: "GL-10242",
    customerId: "c5",
    customerName: "Maryam Tariq",
    phone: "+92 312 4567890",
    address: ADDRESSES[0],
    items: [{ serviceId: "saree", name: "Saree Care", qty: 1, unit: "piece", price: 550 }],
    deliveryCharge: 0,
    total: 550,
    slot: "Evening",
    placedAt: "2026-06-18T18:00:00Z",
    status: "delivered",
    payment: "COD",
    rating: 5,
  },
];

export const CUSTOMERS = [
  {
    id: "c1",
    name: "Ayesha Khan",
    email: "ayesha@example.com",
    phone: "+92 300 1234567",
    orders: 12,
    joined: "2026-02-14",
    status: "active",
  },
  {
    id: "c2",
    name: "Hamza Iqbal",
    email: "hamza@example.com",
    phone: "+92 321 7654321",
    orders: 7,
    joined: "2026-03-02",
    status: "active",
  },
  {
    id: "c3",
    name: "Sana Riaz",
    email: "sana@example.com",
    phone: "+92 333 9876543",
    orders: 5,
    joined: "2026-04-11",
    status: "active",
  },
  {
    id: "c4",
    name: "Bilal Ahmed",
    email: "bilal@example.com",
    phone: "+92 345 1112233",
    orders: 2,
    joined: "2026-05-20",
    status: "blocked",
  },
  {
    id: "c5",
    name: "Maryam Tariq",
    email: "maryam@example.com",
    phone: "+92 312 4567890",
    orders: 9,
    joined: "2026-01-08",
    status: "active",
  },
  {
    id: "c6",
    name: "Usman Sheikh",
    email: "usman@example.com",
    phone: "+92 301 5556677",
    orders: 14,
    joined: "2025-12-19",
    status: "active",
  },
    {
    id: "c1",
    name: "Ayesha Khan",
    email: "ayesha@example.com",
    phone: "+92 300 1234567",
    orders: 12,
    joined: "2026-02-14",
    status: "active",
  },
  {
    id: "c2",
    name: "Hamza Iqbal",
    email: "hamza@example.com",
    phone: "+92 321 7654321",
    orders: 7,
    joined: "2026-03-02",
    status: "active",
  },
  {
    id: "c3",
    name: "Sana Riaz",
    email: "sana@example.com",
    phone: "+92 333 9876543",
    orders: 5,
    joined: "2026-04-11",
    status: "active",
  },
  {
    id: "c4",
    name: "Bilal Ahmed",
    email: "bilal@example.com",
    phone: "+92 345 1112233",
    orders: 2,
    joined: "2026-05-20",
    status: "blocked",
  },
  {
    id: "c5",
    name: "Maryam Tariq",
    email: "maryam@example.com",
    phone: "+92 312 4567890",
    orders: 9,
    joined: "2026-01-08",
    status: "active",
  },
  {
    id: "c6",
    name: "Usman Sheikh",
    email: "usman@example.com",
    phone: "+92 301 5556677",
    orders: 14,
    joined: "2025-12-19",
    status: "active",
  },
    {
    id: "c1",
    name: "Ayesha Khan",
    email: "ayesha@example.com",
    phone: "+92 300 1234567",
    orders: 12,
    joined: "2026-02-14",
    status: "active",
  },
  {
    id: "c2",
    name: "Hamza Iqbal",
    email: "hamza@example.com",
    phone: "+92 321 7654321",
    orders: 7,
    joined: "2026-03-02",
    status: "active",
  },
  {
    id: "c3",
    name: "Sana Riaz",
    email: "sana@example.com",
    phone: "+92 333 9876543",
    orders: 5,
    joined: "2026-04-11",
    status: "active",
  },
  {
    id: "c4",
    name: "Bilal Ahmed",
    email: "bilal@example.com",
    phone: "+92 345 1112233",
    orders: 2,
    joined: "2026-05-20",
    status: "blocked",
  },
  {
    id: "c5",
    name: "Maryam Tariq",
    email: "maryam@example.com",
    phone: "+92 312 4567890",
    orders: 9,
    joined: "2026-01-08",
    status: "active",
  },
  {
    id: "c6",
    name: "Usman Sheikh",
    email: "usman@example.com",
    phone: "+92 301 5556677",
    orders: 14,
    joined: "2025-12-19",
    status: "active",
  },
];

export const STAFF = [
  {
    id: "s1",
    name: "Imran Sattar",
    email: "imran@golaundry.pk",
    role: "Super Admin",
    lastActive: "2 min ago",
  },
  {
    id: "s2",
    name: "Nadia Hussain",
    email: "nadia@golaundry.pk",
    role: "Admin",
    lastActive: "10 min ago",
  },
  {
    id: "s3",
    name: "Faisal Ali",
    email: "faisal@golaundry.pk",
    role: "Support Agent",
    lastActive: "Just now",
  },
  {
    id: "s4",
    name: "Rabia Mir",
    email: "rabia@golaundry.pk",
    role: "Support Agent",
    lastActive: "1 hr ago",
  },
];

export const ROLES = [
  {
    name: "Super Admin",
    perms: ["Settings", "Warehouse", "Pricing", "Reports", "Users", "Orders", "Customers", "Chat"],
  },
  { name: "Admin", perms: ["Orders", "Customers", "Services", "Reports", "Chat"] },
  { name: "Support Agent", perms: ["Chat", "View Orders"] },
];

export const CHATS = [
  {
    id: "ch1",
    customer: "Ayesha Khan",
    orderId: "GL-10247",
    lastMessage: "Could you please pick up at 3 instead?",
    unread: 2,
    agent: "Faisal Ali",
    status: "open",
    updated: "2 min ago",
  },
  {
    id: "ch2",
    customer: "Hamza Iqbal",
    orderId: "GL-10246",
    lastMessage: "Rider is at the gate, thanks!",
    unread: 0,
    agent: "Rabia Mir",
    status: "open",
    updated: "8 min ago",
  },
  {
    id: "ch3",
    customer: "Sana Riaz",
    orderId: "GL-10245",
    lastMessage: "Perfect, thank you 🌹",
    unread: 0,
    agent: "Faisal Ali",
    status: "resolved",
    updated: "Yesterday",
  },
];

export const CHAT_THREAD = [
  { from: "customer", text: "Hi, I want to change pickup time", at: "10:02 AM" },
  { from: "agent", text: "Of course! What time works for you?", at: "10:03 AM" },
  { from: "customer", text: "Could you please pick up at 3 instead?", at: "10:04 AM" },
];

export const RATINGS = ORDERS.filter((o) => o.rating).map((o) => ({
  orderId: o.id,
  customer: o.customerName,
  stars: o.rating,
  remark: o.rating === 5 ? "Excellent service, on time!" : "Good overall.",
  date: o.placedAt,
}));

export const NOTIFICATIONS = [
  {
    id: "n1",
    title: "Order GL-10247 placed",
    desc: "Ayesha Khan • 6 items • Rs.1,360",
    tone: "info",
    at: "2 min ago",
    unread: true,
  },
  {
    id: "n2",
    title: "New support chat",
    desc: "Hamza Iqbal opened a chat",
    tone: "warning",
    at: "12 min ago",
    unread: true,
  },
  {
    id: "n3",
    title: "Order GL-10245 delivered",
    desc: "5★ rating received",
    tone: "success",
    at: "1 hr ago",
    unread: false,
  },
  {
    id: "n4",
    title: "Service updated",
    desc: "Express Service price raised to Rs.300",
    tone: "info",
    at: "3 hr ago",
    unread: false,
  },
];

export const REPORT_ORDERS_WEEK = [
  { day: "Mon", orders: 24, revenue: 18200 },
  { day: "Tue", orders: 31, revenue: 24600 },
  { day: "Wed", orders: 28, revenue: 21400 },
  { day: "Thu", orders: 42, revenue: 31800 },
  { day: "Fri", orders: 39, revenue: 28950 },
  { day: "Sat", orders: 55, revenue: 41200 },
  { day: "Sun", orders: 48, revenue: 37500 },
];

export const REPORT_SERVICE_MIX = [
  { name: "Wash & Iron", value: 32 },
  { name: "Wash & Fold", value: 28 },
  { name: "Iron / Press", value: 18 },
  { name: "Dry Clean", value: 12 },
  { name: "Other", value: 10 },
];

export const REPORT_ZONE = [
  { zone: "0–5 KM", orders: 124 },
  { zone: "5–10 KM", orders: 86 },
  { zone: "10–15 KM", orders: 34 },
];

export const CURRENT_USER = {
  name: "Ayesha Khan",
  email: "ayesha@example.com",
  phone: "+92 300 1234567",
  initials: "AK",
};

export function statusMeta(key) {
  return ORDER_STATUSES.find((s) => s.key === key) || { label: key, tone: "info" };
}

export function formatPKR(n) {
  return "Rs. " + Number(n).toLocaleString("en-PK");
}
