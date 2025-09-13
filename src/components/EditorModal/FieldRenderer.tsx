import React from "react";

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
  switch (field.type) {
    case "string":
      return (
        <input
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
      );

    case "number":
      return (
        <input
          type="number"
          value={typeof value === "number" ? value : ""}
          onChange={(e) =>
            onChange(e.target.value === "" ? null : Number(e.target.value))
          }
          disabled={disabled}
        />
      );

    case "boolean":
      return (
        <input
          type="checkbox"
          checked={!!value}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
        />
      );

    case "date":
      const formatted =
        value instanceof Date
          ? value.toISOString().slice(0, 10)
          : typeof value === "string"
          ? value.slice(0, 10)
          : "";

      return (
        <input
          type="date"
          value={formatted}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
      );

    default:
      return <span>{String(value)}</span>;
  }
}
