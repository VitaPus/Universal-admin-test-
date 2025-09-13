// lib/filterConfigs.ts
import { FilterDef } from '@/components/Filters/FilterRegistry';

export const productFilters: FilterDef[] = [
  { key: 'name', type: 'text', label: 'Name' },
  { key: 'options.size', type: 'text', label: 'Size' },
  { key: 'options.amount', type: 'text', label: 'Amount' },
  { key: 'active', type: 'boolean', label: 'Active' },
  { key: 'createdAt', type: 'dateRange', label: 'Created Date' }
];

export const pricePlanFilters: FilterDef[] = [
  { key: 'description', type: 'text', label: 'Description' },
  { key: 'active', type: 'boolean', label: 'Active' },
  { key: 'createdAt', type: 'dateRange', label: 'Created Date' },
  { key: 'removedAt', type: 'dateRange', label: 'Removed Date' }
];

export const pageFilters: FilterDef[] = [
  { key: 'title', type: 'text', label: 'Title' },
  { key: 'active', type: 'boolean', label: 'Active' },
  { key: 'updatedAt', type: 'dateRange', label: 'Updated Date' },
  { key: 'publishedAt', type: 'dateRange', label: 'Published Date' }
];