// @ts-nocheck
import { TableHeader } from "./TableHeader";
import { TableBody } from "./TableBody";
import { COLUMN_HEADERS } from "../data/customersData";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  joined: string;
  status: "active" | "blocked";
}

interface TableProps {
  rows: Customer[];
  onBlock: (customer: Customer) => void;
  onUnblock: (customer: Customer) => void;
}

export function Table({ rows, onBlock, onUnblock }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <TableHeader columns={COLUMN_HEADERS} />
        <TableBody rows={rows} onBlock={onBlock} onUnblock={onUnblock} />
      </table>
    </div>
  );
}
