'use client';
import React, { useEffect, useState } from 'react';
import { Table } from '@/components/Table/Table';
import { FiltersBar } from '@/components/Filters/FiltersBar';
import { EditorModal } from '@/components/EditorModal/EditorModal';
import { useEntitiesStore } from '@/stores/useEntitiesStore';
import { pageColumns } from '@/lib/columnsConfig';
import { pageFields } from '@/lib/fieldConfigs';
import { pageFilters } from '@/lib/filterConfigs';
import { applyFilters } from '@/lib/filterUtils';
import { Page } from '@/types/type';

export default function PagesPage() {
  const { pages, setData, updateItem, deleteItem, setFilters, setSort } = useEntitiesStore();
  const [editingPage, setEditingPage] = useState<Page | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/pages.json')
      .then(res => res.json())
      .then(data => {
        setData('pages', data);
        setIsLoading(false);
      });
  }, [setData]);

  const filteredData = applyFilters(pages.data, pages.filters, pageFilters);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pages</h1>

      <FiltersBar
        filters={pageFilters}
        values={pages.filters}
        onChange={(filters) => setFilters('pages', filters)}
      />

      <Table
        columns={pageColumns}
        data={filteredData}
        onEdit={setEditingPage}
        onDelete={(page) => deleteItem('pages', page.id)}
        sortKey={pages.sort?.key}
        sortAsc={pages.sort?.asc}
        onSortChange={(key, asc) => setSort('pages', { key, asc })}
      />

      <EditorModal
        open={!!editingPage}
        onClose={() => setEditingPage(null)}
        row={editingPage}
        fields={pageFields}
        onSave={(updatedPage) => {
          updateItem('pages', updatedPage.id, updatedPage);
          setEditingPage(null);
        }}
      />
    </div>
  );
}
