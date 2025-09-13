// lib/fieldConfigs.ts
import { FieldConfig } from '@/components/EditorModal/EditorModal';
import { Product, PricePlan, Page } from '@/types/type';

export const productFields: FieldConfig<Product>[] = [
  { key: 'name', label: 'Name', type: 'string', editable: true },
  { key: 'options.size', label: 'Size', type: 'string', editable: true },
  { key: 'options.amount', label: 'Amount', type: 'number', editable: true },
  { key: 'active', label: 'Active', type: 'boolean', editable: true }
];

export const pricePlanFields: FieldConfig<PricePlan>[] = [
  { key: 'description', label: 'Description', type: 'string', editable: true },
  { key: 'active', label: 'Active', type: 'boolean', editable: true },
  { key: 'removedAt', label: 'Removed At', type: 'date', editable: true,
    readonly: (row) => !row.active }
];

export const pageFields: FieldConfig<Page>[] = [
  { key: 'title', label: 'Title', type: 'string', editable: true },
  { key: 'active', label: 'Active', type: 'boolean', editable: true,
    readonly: (row) => new Date(row.publishedAt).getTime() > Date.now() }
];