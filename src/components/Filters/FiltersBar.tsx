/* eslint-disable @typescript-eslint/no-explicit-any */
// components/Filters/FiltersBar.tsx
import React from 'react';
import { FilterDef } from './FilterRegistry';

type FiltersBarProps = {
  filters: FilterDef[];
  values: Record<string, any>;
  onChange: (values: Record<string, any>) => void;
};

export function FiltersBar({ filters, values, onChange }: FiltersBarProps) {
  const handleFilterChange = (key: string, value: any) => {
    onChange({ ...values, [key]: value });
  };

  return (
    <div className="flex flex-wrap gap-4 mb-4 p-4 bg-gray-50 rounded">
      {filters.map((filter) => {
        switch (filter.type) {
          case 'text':
            return (
              <div key={filter.key} className="flex flex-col">
                <label className="text-sm font-medium mb-1">{filter.label}</label>
                <input
                  type="text"
                  value={values[filter.key] || ''}
                  onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                  className="border rounded px-2 py-1"
                  placeholder={`Filter by ${filter.label}`}
                />
              </div>
            );

          case 'boolean':
            return (
              <div key={filter.key} className="flex flex-col">
                <label className="text-sm font-medium mb-1">{filter.label}</label>
                <select
                  value={values[filter.key] ?? ''}
                  onChange={(e) => handleFilterChange(filter.key, e.target.value === '' ? null : e.target.value === 'true')}
                  className="border rounded px-2 py-1"
                >
                  <option value="">All</option>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>
            );

          case 'dateRange':
            return (
              <div key={filter.key} className="flex flex-col">
                <label className="text-sm font-medium mb-1">{filter.label}</label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    value={values[filter.key]?.from || ''}
                    onChange={(e) => handleFilterChange(filter.key, {
                      ...values[filter.key],
                      from: e.target.value
                    })}
                    className="border rounded px-2 py-1"
                  />
                  <span>to</span>
                  <input
                    type="date"
                    value={values[filter.key]?.to || ''}
                    onChange={(e) => handleFilterChange(filter.key, {
                      ...values[filter.key],
                      to: e.target.value
                    })}
                    className="border rounded px-2 py-1"
                  />
                </div>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
}