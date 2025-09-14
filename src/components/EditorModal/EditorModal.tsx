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
  <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 animate-fade-in">
    <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-md p-6 transform animate-scale-in">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Edit</h3>

      <div className="space-y-4">
        {fields.map((f) => (
          <div key={f.key} className="flex gap-2 items-center">
            <label className="text-lg font-medium text-gray-700 dark:text-gray-300">
              {f.label ?? f.key}:
            </label>
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
      </div>

      <div className="mt-6 flex justify-end gap-3">
        <button
          onClick={onClose}
          className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 transition"
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
        >
          Save
        </button>
      </div>
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