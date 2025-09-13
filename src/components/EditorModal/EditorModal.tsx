import React, { useState } from "react";
import { FieldRenderer } from "./FieldRenderer";

export type FieldConfig<T = unknown> = {
  key: string;
  label?: string;
  type: "string" | "number" | "boolean" | "date";
  editable?: boolean;
  readonly?: (row: T) => boolean;
};

type EditorModalProps<T> = {
  open: boolean;
  onClose: () => void;
  row: T | null;
  fields: FieldConfig<T>[];
  onSave: (r: T) => void;
};

export function EditorModal<T>({
  open,
  onClose,
  row,
  fields,
  onSave,
}: EditorModalProps<T>) {
  const [draft, setDraft] = useState<T | null>(row);

  React.useEffect(() => {
    setDraft(row);
  }, [row]);

  if (!open || !draft) return null;

  const handleSave = () => {
    if (draft) {
      onSave(draft);
    }
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Edit</h3>
        {fields.map((f) => (
          <div key={f.key}>
            <label>{f.label ?? f.key}</label>
            <FieldRenderer
              field={f}
              value={getPath(draft, f.key)}
              onChange={(val) => {
                if (draft) {
                  setDraft(setPath({ ...draft }, f.key, val));
                }
              }}
              disabled={!f.editable || !!f.readonly?.(draft)}
            />
          </div>
        ))}
        <button onClick={handleSave}>Save</button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}

// Вспомогательные функции для работы с путями в объектах
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getPath(obj: any, path: string): unknown {
  return path.split(".").reduce((o, p) => (o == null ? undefined : o[p]), obj);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setPath(obj: any, path: string, value: unknown): any {
  const keys = path.split(".");
  const lastKey = keys.pop()!;
  const target = keys.reduce((o, p) => (o[p] = o[p] || {}), obj);
  target[lastKey] = value;
  return obj;
}