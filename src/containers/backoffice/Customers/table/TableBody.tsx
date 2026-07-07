// @ts-nocheck
import { Ban, CheckCircle2 } from "lucide-react";

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  joined: string;
  status: "active" | "blocked";
}

interface TableBodyProps {
  rows: Customer[];
  onBlock: (customer: Customer) => void;
  onUnblock: (customer: Customer) => void;
}

export function TableBody({ rows, onBlock, onUnblock }: TableBodyProps) {
  return (
    <tbody>
      {rows.map((c) => (
        <tr
          key={c.id}
          className="border-t border-[color:var(--glass-border)] hover:bg-[color:var(--muted)] transition-colors"
        >
          {/* Customer */}
          <td className="py-3 px-3">
            <div className="flex items-center gap-3">
              <div
                className="w-9 h-9 rounded-full grid place-items-center text-xs font-medium shrink-0"
                style={{
                  background: "var(--gradient-gold)",
                  color: "var(--primary-foreground)",
                }}
              >
                {c.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <span>{c.name}</span>
            </div>
          </td>

          {/* Email */}
          <td className="py-3 px-3 text-muted-foreground">{c.email}</td>

          {/* Phone */}
          <td className="py-3 px-3 text-muted-foreground">{c.phone}</td>

          {/* Orders */}
          <td className="py-3 px-3 gold-text font-medium">{c.orders}</td>

          {/* Joined */}
          <td className="py-3 px-3 text-muted-foreground">{c.joined}</td>

          {/* Status */}
          <td className="py-3 px-3">
            <span
              className={`text-[11px] px-2.5 py-1 rounded-full border ${
                c.status === "active"
                  ? "bg-[color:var(--success)]/15 text-[color:var(--success)] border-[color:var(--success)]/30"
                  : "bg-[color:var(--destructive)]/15 text-[color:var(--destructive)] border-[color:var(--destructive)]/30"
              }`}
            >
              {c.status}
            </span>
          </td>

          {/* Actions */}
          <td className="py-3 px-3 text-right">
            {c.status === "active" ? (
              <button
                onClick={() => onBlock(c)}
                className="text-xs text-[color:var(--destructive)] hover:underline inline-flex items-center gap-1"
              >
                <Ban className="w-3 h-3" /> Block
              </button>
            ) : (
              <button
                onClick={() => onUnblock(c)}
                className="text-xs text-[color:var(--success)] hover:underline inline-flex items-center gap-1"
              >
                <CheckCircle2 className="w-3 h-3" /> Unblock
              </button>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  );
}
