// @ts-nocheck
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react";

interface TablePaginationProps {
  /** Total number of items across all pages */
  totalItems: number;
  /** Current active page (1-indexed) */
  currentPage: number;
  /** Number of rows per page */
  pageSize: number;
  /** Available page-size options */
  pageSizeOptions?: number[];
  /** Called when the user navigates to a different page */
  onPageChange: (page: number) => void;
  /** Called when the user changes the page size */
  onPageSizeChange: (size: number) => void;
  /** Optional extra class names for the wrapper */
  className?: string;
}

export function TablePagination({
  totalItems,
  currentPage,
  pageSize,
  pageSizeOptions = [5, 10, 20, 50],
  onPageChange,
  onPageSizeChange,
  className = "",
}: TablePaginationProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const from = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalItems);

  const go = (page: number) => {
    const clamped = Math.max(1, Math.min(page, totalPages));
    if (clamped !== currentPage) onPageChange(clamped);
  };

  return (
    <div
      className={`flex flex-wrap items-center justify-between gap-3 px-1 py-3 text-sm text-muted-foreground select-none ${className}`}
    >
      {/* Page-size selector */}
      <div className="flex items-center gap-2">
        <span className="whitespace-nowrap">Rows per page</span>
        <select
          value={pageSize}
          onChange={(e) => {
            onPageSizeChange(Number(e.target.value));
            onPageChange(1);
          }}
          className="rounded-md border border-[color:var(--glass-border)] bg-[color:var(--card)] px-2 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-[color:var(--primary)] cursor-pointer"
        >
          {pageSizeOptions.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      </div>

      {/* Info + nav */}
      <div className="flex items-center gap-2">
        <span className="whitespace-nowrap text-xs">
          {from}–{to} of {totalItems}
        </span>

        {/* First */}
        <PaginationBtn
          onClick={() => go(1)}
          disabled={currentPage === 1}
          aria-label="First page"
        >
          <ChevronsLeft className="w-3.5 h-3.5" />
        </PaginationBtn>

        {/* Prev */}
        <PaginationBtn
          onClick={() => go(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </PaginationBtn>

        {/* Page numbers */}
        <div className="flex items-center gap-1">
          {buildPageList(currentPage, totalPages).map((item, i) =>
            item === "…" ? (
              <span key={`ellipsis-${i}`} className="px-1 text-xs">
                …
              </span>
            ) : (
              <button
                key={item}
                onClick={() => go(item as number)}
                className={`min-w-[28px] h-7 rounded-md text-xs font-medium transition-colors
                  ${
                    item === currentPage
                      ? "gold-text border border-[color:var(--primary)] bg-[color:var(--primary)]/10"
                      : "hover:bg-[color:var(--muted)] border border-transparent"
                  }`}
              >
                {item}
              </button>
            ),
          )}
        </div>

        {/* Next */}
        <PaginationBtn
          onClick={() => go(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </PaginationBtn>

        {/* Last */}
        <PaginationBtn
          onClick={() => go(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Last page"
        >
          <ChevronsRight className="w-3.5 h-3.5" />
        </PaginationBtn>
      </div>
    </div>
  );
}

/* ── helpers ──────────────────────────────────────────────── */

function PaginationBtn({
  children,
  disabled,
  onClick,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { disabled?: boolean }) {
  return (
    <button
      {...rest}
      onClick={onClick}
      disabled={disabled}
      className={`w-7 h-7 rounded-md border flex items-center justify-center transition-colors
        ${
          disabled
            ? "opacity-30 cursor-not-allowed border-transparent"
            : "hover:bg-[color:var(--muted)] border-[color:var(--glass-border)] cursor-pointer"
        }`}
    >
      {children}
    </button>
  );
}

/** Produces page numbers + ellipsis markers for the pagination strip. */
function buildPageList(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

  const pages: (number | "…")[] = [1];

  if (current > 3) pages.push("…");

  const start = Math.max(2, current - 1);
  const end = Math.min(total - 1, current + 1);

  for (let p = start; p <= end; p++) pages.push(p);

  if (current < total - 2) pages.push("…");

  pages.push(total);
  return pages;
}
