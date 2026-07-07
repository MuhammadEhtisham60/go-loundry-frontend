// @ts-nocheck

interface Column {
  key: string;
  label: string;
}

interface TableHeaderProps {
  columns: Column[];
}

export function TableHeader({ columns }: TableHeaderProps) {
  return (
    <thead className="text-xs uppercase tracking-widest text-muted-foreground">
      <tr className="text-left">
        {columns.map((col) => (
          <th key={col.key} className="py-3 px-3 font-medium">
            {col.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}
