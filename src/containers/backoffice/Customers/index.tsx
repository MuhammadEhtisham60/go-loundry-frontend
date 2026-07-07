// @ts-nocheck
import { useState } from "react";
import { toast } from "sonner";
import { Search } from "lucide-react";

import { AdminShell } from "@/components/admin-shell";
import { Section, Input } from "@/components/ui-kit";
import { TablePagination } from "@/components/common/tablesCommon/TablePagination";
import { DEFAULT_PAGE_SIZE } from "@/contant/constant";

import { CUSTOMERS } from "./data/customersData";
import { Table } from "./table";

export function AdminCustomers() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  /* ── derived state ─────────────────────────────────────── */
  const filtered = CUSTOMERS.filter(
    (c) =>
      !query ||
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase()),
  );

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  /* ── handlers ──────────────────────────────────────────── */
  const handleSearch = (value) => {
    setQuery(value);
    setPage(1);           // reset to first page on new search
  };

  const handleBlock   = (c) => toast.error(`${c.name} blocked`);
  const handleUnblock = (c) => toast.success(`${c.name} unblocked`);

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setPage(1);
  };

  /* ── render ────────────────────────────────────────────── */
  return (
    <AdminShell
      title="Customers"
      subtitle={`${CUSTOMERS.length} registered • ${
        CUSTOMERS.filter((c) => c.status === "active").length
      } active`}
      actions={
        <div className="relative flex-1 max-w-sm">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-9 h-10"
            placeholder="Search by name or email…"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      }
    >
      <Section>
        <Table
          rows={paginated}
          onBlock={handleBlock}
          onUnblock={handleUnblock}
        />

        <TablePagination
          totalItems={filtered.length}
          currentPage={page}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={handlePageSizeChange}
        />
      </Section>
    </AdminShell>
  );
}
