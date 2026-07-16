// @ts-nocheck
import { useState } from "react";
import { toast } from "sonner";
import { Search, Loader2 } from "lucide-react";

import { AdminShell } from "@/components/admin-shell";
import { Section, Input } from "@/components/ui-kit";
import { TablePagination } from "@/components/common/tablesCommon/TablePagination";
import { DEFAULT_PAGE_SIZE } from "@/contant/constant";
import { useGetCustomersQuery, useBlockUserMutation } from "@/services";

import { Table } from "./table";

export function AdminCustomers() {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const { data: customersRes, isLoading } = useGetCustomersQuery();
  const [blockUser] = useBlockUserMutation();

  const customers = customersRes?.data || [];

  /* ── derived state ─────────────────────────────────────── */
  const filtered = customers.filter(
    (c) =>
      !query ||
      c.full_name?.toLowerCase().includes(query.toLowerCase()) ||
      c.email?.toLowerCase().includes(query.toLowerCase()) ||
      c.phone?.toLowerCase().includes(query.toLowerCase()),
  );

  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  /* ── handlers ──────────────────────────────────────────── */
  const handleSearch = (value) => {
    setQuery(value);
    setPage(1);           // reset to first page on new search
  };

  const handleBlock = async (c) => {
    try {
      await blockUser({ id: c.id, is_blocked: true }).unwrap();
      toast.success(`${c.full_name || "Customer"} blocked successfully`);
    } catch (err) {
      toast.error(err?.data?.message || `Failed to block ${c.full_name || "Customer"}`);
    }
  };

  const handleUnblock = async (c) => {
    try {
      await blockUser({ id: c.id, is_blocked: false }).unwrap();
      toast.success(`${c.full_name || "Customer"} unblocked successfully`);
    } catch (err) {
      toast.error(err?.data?.message || `Failed to unblock ${c.full_name || "Customer"}`);
    }
  };

  const handlePageSizeChange = (size) => {
    setPageSize(size);
    setPage(1);
  };

  /* ── render ────────────────────────────────────────────── */
  const totalCount = customers.length;
  const activeCount = customers.filter((c) => !c.is_blocked).length;

  return (
    <AdminShell
      title="Customers"
      subtitle={`${totalCount} registered • ${activeCount} active`}
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
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-[color:var(--primary)]" />
          </div>
        ) : (
          <>
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
          </>
        )}
      </Section>
    </AdminShell>
  );
}
