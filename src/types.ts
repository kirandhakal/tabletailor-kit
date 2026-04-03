import type { ReactNode } from "react";

export type TableTheme = "light" | "dark" | "auto";

export type BackgroundToken = "default" | "slate" | "zinc" | "neutral" | "stone";

export type LocaleCode = "en" | "es" | "fr";

export interface TableLocale {
  rowsPerPage: string;
  previous: string;
  next: string;
  page: string;
  of: string;
  noData: string;
  rows: string;
  columns: string;
}

export interface ColumnDef<TData> {
  id?: string;
  header: string;
  accessorKey?: keyof TData;
  accessorFn?: (row: TData, rowIndex: number) => unknown;
  cell?: (value: unknown, row: TData, rowIndex: number) => ReactNode;
  className?: string;
  headerClassName?: string;
}

export interface TableProps<TData extends Record<string, unknown>> {
  data: TData[];
  columns: ColumnDef<TData>[];
  rowKey?: keyof TData | ((row: TData, rowIndex: number) => string | number);
  className?: string;
  tableClassName?: string;
  theadClassName?: string;
  tbodyClassName?: string;
  theadBg?: BackgroundToken;
  tbodyBg?: BackgroundToken;
  theme?: TableTheme;
  locale?: LocaleCode;
  translations?: Partial<TableLocale>;
  responsive?: boolean;
  showPagination?: boolean;
  page?: number;
  defaultPage?: number;
  onPageChange?: (page: number) => void;
  pageSize?: number;
  defaultPageSize?: number;
  onPageSizeChange?: (pageSize: number) => void;
  pageSizeOptions?: number[];
  enableDimensionControls?: boolean;
  rowCount?: number;
  defaultRowCount?: number;
  onRowCountChange?: (rowCount: number) => void;
  columnCount?: number;
  defaultColumnCount?: number;
  onColumnCountChange?: (columnCount: number) => void;
}
