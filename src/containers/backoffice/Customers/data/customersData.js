// @ts-nocheck
import { CUSTOMERS } from "@/lib/mock-data";

export { CUSTOMERS };

/** Column labels rendered by TableHeader */
export const COLUMN_HEADERS = [
  { key: "customer", label: "Customer" },
  { key: "email",    label: "Email" },
  { key: "phone",    label: "Phone" },
  { key: "orders",   label: "Orders" },
  { key: "joined",   label: "Joined" },
  { key: "status",   label: "Status" },
  { key: "actions",  label: "" },          // action column — no heading
];
