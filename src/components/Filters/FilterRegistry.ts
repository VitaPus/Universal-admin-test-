// Регистр фильтров: текстовый, булев, датный диапазон

export type FilterDef = {
    key: string;
    type: 'text' | 'boolean' | 'dateRange';
    label?: string
}

export const FILTERS: FilterDef[] = [
    {key: 'name', type: 'text', label: 'Name'},
    {key: 'active', type: 'boolean', label: 'Active'},
    {key: 'createAt', type: 'dateRange', label: 'Created'}
]