// app/products/page.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { Table } from '@/components/Table/Table';
import { FiltersBar } from '@/components/Filters/FiltersBar';
import { EditorModal } from '@/components/EditorModal/EditorModal';
import { useEntitiesStore } from '@/stores/useEntitiesStore';
import { productColumns } from '@/lib/columnsConfig';
import { productFields } from '@/lib/fieldConfigs';
import { productFilters } from '@/lib/filterConfigs';
import { applyFilters } from '@/lib/filterUtils';
import { Product } from '@/types/type';

export default function ProductsPage() {
  const { products, setData, updateItem, deleteItem, setFilters, setSort } = useEntitiesStore();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
  setIsLoading(true);

  fetch('/api/products')
    .then(res => {
      if (!res.ok) throw new Error('Failed to fetch products');
      return res.json();
    })
    .then(data => setData('products', data))
    .catch(err => console.error(err))
    .finally(() => setIsLoading(false));
}, [setData]);

  const filteredData = applyFilters(products.data, products.filters, productFilters);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      
      <FiltersBar
        filters={productFilters}
        values={products.filters}
        onChange={(filters) => setFilters('products', filters)}
      />

      <Table
        columns={productColumns}
        data={filteredData}
        onEdit={setEditingProduct}
        onDelete={(product) => deleteItem('products', product.id)}
        sortKey={products.sort?.key}
        sortAsc={products.sort?.asc}
        onSortChange={(key, asc) => setSort('products', { key, asc })}
      />

      <EditorModal
        open={!!editingProduct}
        onClose={() => setEditingProduct(null)}
        row={editingProduct}
        fields={productFields}
        onSave={(updatedProduct) => {
          updateItem('products', updatedProduct.id, updatedProduct);
          setEditingProduct(null);
        }}
      />
    </div>
  );
}