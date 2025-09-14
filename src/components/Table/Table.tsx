import React, { useMemo, memo, JSX } from "react";
import { Column } from "./types";

type Props<T> = {
  columns: Column<T>[];
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  sortKey?: string | null;
  sortAsc?: boolean;
  onSortChange?: (key: string, asc: boolean) => void;
};

function TableComponent<T extends Record<string, unknown>>({
  columns,
  data,
  onEdit,
  onDelete,
  sortKey = null,
  sortAsc = true,
  onSortChange,
}: Props<T>) {
  const sortedData = useMemo(() => {
    if (!sortKey) return data;

    const col = columns.find((c) => c.key === sortKey);
    if (!col?.accessor) return data;

    const getValue = (row: T) =>
      typeof col.accessor === "function"
        ? col.accessor(row)
        : getPath(row, col.accessor as string);

    return [...data].sort((a, b) => {
      const av = getValue(a);
      const bv = getValue(b);

      if (av == null) return 1;
      if (bv == null) return -1;
      if (av < bv) return sortAsc ? -1 : 1;
      if (av > bv) return sortAsc ? 1 : -1;
      return 0;
    });
  }, [data, sortKey, sortAsc, columns]);

  const handleSortChange = (key: string) => {
    if (!onSortChange) return;
    
    if (sortKey === key) {
      onSortChange(key, !sortAsc);
    } else {
      onSortChange(key, true);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse border border-green-300">
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                className={`border border-gray-300 px-10 py-2 ${
                  col.sortable
                    ? "cursor-pointer hover:bg-gray-100 transition-colors"
                    : ""
                }`}
                onClick={() => col.sortable && handleSortChange(col.key)}
                aria-sort={
                  sortKey === col.key
                    ? sortAsc
                      ? "ascending"
                      : "descending"
                    : "none"
                }
                style={{ width: col.width }}
              >
                <div className="flex items-center justify-between">
                  <span>{col.title ?? col.key}</span>
                  {col.sortable && sortKey === col.key && (
                    <span>{sortAsc ? "↑" : "↓"}</span>
                  )}
                </div>
              </th>
            ))}
            {(onEdit || onDelete) && (
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            )}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row, i) => (
            <tr
              key={i}
              className="hover:bg-gray-50 even:bg-gray-50 transition-colors"
            >
              {columns.map((col) => {
                const value =
                  typeof col.accessor === "function"
                    ? col.accessor(row)
                    : col.accessor
                    ? getPath(row, col.accessor as string)
                    : undefined;
                return (
                  <td key={col.key} className="border border-gray-300 px-4 py-2">
                    {col.render ? col.render(value, row) : String(value ?? "")}
                  </td>
                );
              })}
              {(onEdit || onDelete) && (
                <td className="border border-gray-300 px-4 py-2">
                  <div className="flex space-x-2">
                    {onEdit && (
                      <button
                        className="text-blue-600 hover:text-blue-800 transition-colors border rounded-md p-1 bg-blue-50"
                        onClick={() => onEdit(row)}
                        aria-label={`Edit ${getPath(row, "id") || "item"}`}
                      >
                        EDIT
                      </button>
                    )}
                    {onDelete && (
                      <button
                        className="text-red-600 hover:text-red-800 transition-colors border rounded-md p-1 bg-red-50"
                        onClick={() => onDelete(row)}
                        aria-label={`Delete ${getPath(row, "id") || "item"}`}
                      >
                        DELETE
                      </button>
                    )}
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getPath(obj: any, path: string) {
  return path.split(".").reduce((o, p) => (o == null ? undefined : o[p]), obj);
}

export const Table = memo(TableComponent) as <T extends Record<string, unknown>>(
  props: Props<T>
) => JSX.Element;