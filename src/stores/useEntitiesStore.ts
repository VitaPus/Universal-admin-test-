// stores/useEntitiesStore.ts
import { create } from 'zustand';
import { Product, PricePlan, Page, EntityType } from '@/types/type';

type EntityState<T> = {
  data: T[];
  filters: Record<string, unknown>;
  sort: { key: string; asc: boolean } | null;
};

type State = {
  products: EntityState<Product>;
  pricePlans: EntityState<PricePlan>;
  pages: EntityState<Page>;
  currentEntity: EntityType;
  
  // Actions
  setData: <T>(entity: EntityType, data: T[]) => void;
  updateItem: <T>(entity: EntityType, id: number, patch: Partial<T>) => void;
  deleteItem: (entity: EntityType, id: number) => void;
  setFilters: (entity: EntityType, filters: Record<string, unknown>) => void;
  setSort: (entity: EntityType, sort: { key: string; asc: boolean } | null) => void;
  setCurrentEntity: (entity: EntityType) => void;
};

export const useEntitiesStore = create<State>((set) => ({
  products: { data: [], filters: {}, sort: null },
  pricePlans: { data: [], filters: {}, sort: null },
  pages: { data: [], filters: {}, sort: null },
  currentEntity: 'pages',

  setData: (entity, data) => set((state) => ({
    [entity]: { ...state[entity], data }
  })),

  updateItem: (entity, id, patch) => set((state) => ({
    [entity]: {
      ...state[entity],
      data: state[entity].data.map(item => 
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item as any).id === id ? { ...item, ...patch } : item
      )
    }
  })),

  deleteItem: (entity, id) => set((state) => ({
    [entity]: {
      ...state[entity],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      data: state[entity].data.filter(item => (item as any).id !== id)
    }
  })),

  setFilters: (entity, filters) => set((state) => ({
    [entity]: { ...state[entity], filters }
  })),

  setSort: (entity, sort) => set((state) => ({
    [entity]: { ...state[entity], sort }
  })),

  setCurrentEntity: (entity) => set({ currentEntity: entity })
}));