import React, { useState } from "react";

type Field = {
  type: "string" | "number" | "boolean" | "date";
};

type Props = {
  field: Field;
  value: string | number | boolean | Date | null | undefined | unknown;
  onChange: (value: string | number | boolean | null) => void;
  disabled?: boolean;
};

export function FieldRenderer({ field, value, onChange, disabled = false }: Props) {
  const [editing, setEditing] = useState(false);

  const handleFocus = () => setEditing(true);
  const handleBlur = () => setEditing(false);

  switch (field.type) {
    case "string":
      return editing ? (
        <input
          className="border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          disabled={disabled}
        />
      ) : (
        <span
          className="cursor-text hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 block"
          onClick={handleFocus}
        >
          {String(value ?? "—")}
        </span>
      );

    case "number":
      return editing ? (
        <input
          type="number"
          className="border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={typeof value === "number" ? value : ""}
          onChange={(e) => onChange(e.target.value === "" ? null : Number(e.target.value))}
          onBlur={handleBlur}
          autoFocus
          disabled={disabled}
        />
      ) : (
        <span
          className="cursor-text hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 block"
          onClick={handleFocus}
        >
          {String(value ?? "—")}
        </span>
      );

    case "boolean":
      return (
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="w-5 h-5 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
        />
      );

    case "date":
      const formatted =
        value instanceof Date
          ? value.toISOString().slice(0, 10)
          : typeof value === "string"
          ? value.slice(0, 10)
          : "";

      return editing ? (
        <input
          type="date"
          className="border rounded px-2 py-1 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={formatted}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
          autoFocus
          disabled={disabled}
        />
      ) : (
        <span
          className="cursor-text hover:bg-gray-100 dark:hover:bg-gray-700 px-2 py-1 block"
          onClick={handleFocus}
        >
          {formatted || "—"}
        </span>
      );

    default:
      return <span>{String(value)}</span>;
  }
}
