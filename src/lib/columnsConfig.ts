// lib/columnsConfig.ts
import { Column } from '@/components/Table/types';
import { Product, PricePlan, Page } from '@/types/type';

export const productColumns: Column<Product>[] = [
  { 
    key: 'id', 
    title: 'ID', 
    accessor: (item) => item.id, 
    sortable: true, 
    width: '10%' 
  },
  { 
    key: 'name', 
    title: 'Name', 
    accessor: (item) => item.name, 
    sortable: true, 
    width: '20%' 
  },
  { 
    key: 'options.size', 
    title: 'Size', 
    accessor: (item) => item.options.size, 
    sortable: true, 
    width: '15%' 
  },
  { 
    key: 'options.amount', 
    title: 'Amount', 
    accessor: (item) => item.options.amount, 
    sortable: true, 
    width: '15%' 
  },
  { 
    key: 'active', 
    title: 'Active', 
    accessor: (item) => item.active, 
    sortable: true, 
    width: '10%', 
    render: (value: unknown) => (value as boolean) ? 'Yes' : 'No' 
  },
  { 
    key: 'createdAt', 
    title: 'Created', 
    accessor: (item) => item.createdAt, 
    sortable: true, 
    width: '20%',
    render: (value: unknown) => new Date(value as string).toLocaleDateString() 
  }
];

export const pricePlanColumns: Column<PricePlan>[] = [
  { 
    key: 'id', 
    title: 'ID', 
    accessor: (item) => item.id, 
    sortable: true, 
    width: '10%' 
  },
  { 
    key: 'description', 
    title: 'Description', 
    accessor: (item) => item.description, 
    sortable: true, 
    width: '30%' 
  },
  { 
    key: 'active', 
    title: 'Active', 
    accessor: (item) => item.active, 
    sortable: true, 
    width: '15%',
    render: (value: unknown) => (value as boolean) ? 'Yes' : 'No' 
  },
  { 
    key: 'createdAt', 
    title: 'Created', 
    accessor: (item) => item.createdAt, 
    sortable: true, 
    width: '20%',
    render: (value: unknown) => new Date(value as string).toLocaleDateString() 
  },
  { 
    key: 'removedAt', 
    title: 'Removed', 
    accessor: (item) => item.removedAt, 
    sortable: true, 
    width: '20%',
    render: (value: unknown) => value ? new Date(value as string).toLocaleDateString() : '-' 
  }
];

export const pageColumns: Column<Page>[] = [
  { 
    key: 'id', 
    title: 'ID', 
    accessor: (item) => item.id, 
    sortable: true, 
    width: '10%' 
  },
  { 
    key: 'title', 
    title: 'Title', 
    accessor: (item) => item.title, 
    sortable: true, 
    width: '25%' 
  },
  { 
    key: 'active', 
    title: 'Active', 
    accessor: (item) => item.active, 
    sortable: true, 
    width: '15%',
    render: (value: unknown) => (value as boolean) ? 'Yes' : 'No' 
  },
  { 
    key: 'updatedAt', 
    title: 'Updated', 
    accessor: (item) => item.updatedAt, 
    sortable: true, 
    width: '25%',
    render: (value: unknown) => new Date(value as string).toLocaleDateString() 
  },
  { 
    key: 'publishedAt', 
    title: 'Published', 
    accessor: (item) => item.publishedAt, 
    sortable: true, 
    width: '25%',
    render: (value: unknown) => new Date(value as string).toLocaleDateString() 
  }
];