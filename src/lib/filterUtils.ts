/* eslint-disable @typescript-eslint/no-explicit-any */
// lib/filterUtils.ts
import { FilterDef } from '@/components/Filters/FilterRegistry';

export function applyFilters<T>(data: T[], filters: Record<string, any>, filterDefs: FilterDef[]): T[] {
  return data.filter(item => {
    return filterDefs.every(filter => {
      const filterValue = filters[filter.key];
      if (filterValue == null || filterValue === '') return true;

      const itemValue = getNestedValue(item, filter.key);

      switch (filter.type) {
        case 'text':
          return String(itemValue).toLowerCase().includes(String(filterValue).toLowerCase());
        
        case 'boolean':
          return itemValue === filterValue;
        
        case 'dateRange':
          if (!filterValue.from && !filterValue.to) return true;
          const date = new Date(itemValue as string);
          const from = filterValue.from ? new Date(filterValue.from) : null;
          const to = filterValue.to ? new Date(filterValue.to) : null;
          
          return (!from || date >= from) && (!to || date <= to);
        
        default:
          return true;
      }
    });
  });
}

function getNestedValue(obj: any, path: string): unknown {
  return path.split('.').reduce((current, key) => {
    return current != null && typeof current === 'object' ? current[key] : undefined;
  }, obj);
}