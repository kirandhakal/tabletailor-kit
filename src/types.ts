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

export interface CustomTheme {
  headerBg?: string; // e.g., "#0051BA", "bg-blue-600"
  headerTextColor?: string; // e.g., "#FFFFFF", "text-white"
  bodyBg?: string; // e.g., "#F5F5F5", "bg-gray-50"
  bodyTextColor?: string; // e.g., "#000000", "text-black"
  borderColor?: string; // e.g., "#CCCCCC", "border-gray-300"
  fontFamily?: string; // e.g., "font-sans", "'Arial', sans-serif"
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
  customTheme?: CustomTheme;
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
  enableSerialNumber?: boolean;
  serialNumberHeader?: string;
}
