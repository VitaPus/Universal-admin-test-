type Accessor<T> = keyof T | ((row: T) => unknown)

export type Column<T> = {
    key: string;
    title?: React.ReactNode;
    accessor?: Accessor<T>;
    render?: (value: unknown, row: T) => React.ReactNode;
    sortable?: boolean;
    width: string;
};