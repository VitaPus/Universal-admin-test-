'use client';
import React, { useEffect, useState } from 'react';
import { Table } from '@/components/Table/Table';
import { FiltersBar } from '@/components/Filters/FiltersBar';
import { EditorModal } from '@/components/EditorModal/EditorModal';
import { useEntitiesStore } from '@/stores/useEntitiesStore';
import { pricePlanColumns } from '@/lib/columnsConfig';
import { pricePlanFields } from '@/lib/fieldConfigs';
import { pricePlanFilters } from '@/lib/filterConfigs';
import { applyFilters } from '@/lib/filterUtils';
import { PricePlan } from '@/types/type';

export default function PricePlansPage() {
  const { pricePlans, setData, updateItem, deleteItem, setFilters, setSort } = useEntitiesStore();
  const [editingPlan, setEditingPlan] = useState<PricePlan | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('/data/price-plans.json')
      .then(res => res.json())
      .then(data => {
        setData('pricePlans', data);
        setIsLoading(false);
      });
  }, [setData]);

  const filteredData = applyFilters(pricePlans.data, pricePlans.filters, pricePlanFilters);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Price Plans</h1>

      <FiltersBar
        filters={pricePlanFilters}
        values={pricePlans.filters}
        onChange={(filters) => setFilters('pricePlans', filters)}
      />

      <Table
        columns={pricePlanColumns}
        data={filteredData}
        onEdit={setEditingPlan}
        onDelete={(plan) => deleteItem('pricePlans', plan.id)}
        sortKey={pricePlans.sort?.key}
        sortAsc={pricePlans.sort?.asc}
        onSortChange={(key, asc) => setSort('pricePlans', { key, asc })}
      />

      <EditorModal
        open={!!editingPlan}
        onClose={() => setEditingPlan(null)}
        row={editingPlan}
        fields={pricePlanFields}
        onSave={(updatedPlan) => {
          updateItem('pricePlans', updatedPlan.id, updatedPlan);
          setEditingPlan(null);
        }}
      />
    </div>
  );
}
