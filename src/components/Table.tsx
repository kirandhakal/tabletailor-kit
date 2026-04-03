import { useMemo, useState } from "react";
import type { ColumnDef, TableProps } from "../types";
import { resolveLocale } from "../utils/locale";
import { clamp, getTotalPages, paginateData } from "../utils/pagination";
import { getTbodyBgClass, getTheadBgClass, getThemeClass, mergeClassNames, getCustomThemeStyles } from "../utils/theme";

function getCellValue<TData extends Record<string, unknown>>(
  row: TData,
  rowIndex: number,
  column: ColumnDef<TData>
): unknown {
  if (column.accessorFn) {
    return column.accessorFn(row, rowIndex);
  }

  if (column.accessorKey) {
    return row[column.accessorKey];
  }

  return undefined;
}

function isHexOrRgb(value: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value) || /^rgb/.test(value);
}

export function Table<TData extends Record<string, unknown>>({
  data,
  columns,
  rowKey,
  className,
  tableClassName,
  theadClassName,
  tbodyClassName,
  theadBg = "default",
  tbodyBg = "default",
  theme = "auto",
  customTheme,
  locale = "en",
  translations,
  responsive = true,
  showPagination = true,
  page,
  defaultPage = 1,
  onPageChange,
  pageSize,
  defaultPageSize = 10,
  onPageSizeChange,
  pageSizeOptions = [5, 10, 20, 50],
  enableDimensionControls = false,
  rowCount,
  defaultRowCount,
  onRowCountChange,
  columnCount,
  defaultColumnCount,
  onColumnCountChange,
  enableSerialNumber = false,
  serialNumberHeader = "S.N"
}: TableProps<TData>) {
  const [internalPage, setInternalPage] = useState(defaultPage);
  const [internalPageSize, setInternalPageSize] = useState(defaultPageSize);
  const [internalRowCount, setInternalRowCount] = useState(defaultRowCount ?? data.length);
  const [internalColumnCount, setInternalColumnCount] = useState(defaultColumnCount ?? columns.length);

  const tableLocale = useMemo(() => resolveLocale(locale, translations), [locale, translations]);

  const selectedRowCount = rowCount ?? internalRowCount;
  const selectedColumnCount = columnCount ?? internalColumnCount;
  const effectiveRowCount = clamp(selectedRowCount, 0, data.length);
  const effectiveColumnCount = clamp(selectedColumnCount, 0, columns.length);

  const selectedData = useMemo(() => data.slice(0, effectiveRowCount), [data, effectiveRowCount]);
  const selectedColumns = useMemo(() => {
    let cols = columns.slice(0, effectiveColumnCount);
    
    if (enableSerialNumber) {
      const snColumn: ColumnDef<TData> = {
        id: "__serial_number__",
        header: serialNumberHeader,
        cell: (_, __, rowIndex) => (
          <span className="font-semibold">{rowIndex + 1}</span>
        )
      };
      cols = [snColumn, ...cols];
    }
    
    return cols;
  }, [columns, effectiveColumnCount, enableSerialNumber, serialNumberHeader]);

  const activePageSize = pageSize ?? internalPageSize;
  const totalPages = getTotalPages(selectedData.length, activePageSize);
  const currentPage = clamp(page ?? internalPage, 1, totalPages);

  const pagedData = useMemo(
    () => paginateData(selectedData, currentPage, activePageSize),
    [selectedData, currentPage, activePageSize]
  );

  const setPageSafely = (nextPage: number) => {
    const safePage = clamp(nextPage, 1, totalPages);

    if (page === undefined) {
      setInternalPage(safePage);
    }

    onPageChange?.(safePage);
  };

  const setPageSizeSafely = (nextPageSize: number) => {
    const safeSize = Math.max(1, nextPageSize);

    if (pageSize === undefined) {
      setInternalPageSize(safeSize);
    }

    if (page === undefined) {
      setInternalPage(1);
    } else {
      onPageChange?.(1);
    }

    onPageSizeChange?.(safeSize);
  };

  const setRowCountSafely = (nextRowCount: number) => {
    const safeRowCount = clamp(nextRowCount, 0, data.length);

    if (rowCount === undefined) {
      setInternalRowCount(safeRowCount);
    }

    onRowCountChange?.(safeRowCount);
  };

  const setColumnCountSafely = (nextColumnCount: number) => {
    const safeColumnCount = clamp(nextColumnCount, 0, columns.length);

    if (columnCount === undefined) {
      setInternalColumnCount(safeColumnCount);
    }

    onColumnCountChange?.(safeColumnCount);
  };

  return (
    <div className={mergeClassNames("tabletailor-root w-full", getThemeClass(theme), className)}>
      {enableDimensionControls && (
        <div className="mb-3 flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
            <span>{tableLocale.rows}</span>
            <input
              aria-label={tableLocale.rows}
              className="h-9 w-20 rounded-md border border-slate-300 bg-white px-2 text-sm dark:border-slate-600 dark:bg-slate-800"
              type="number"
              min={0}
              max={data.length}
              value={effectiveRowCount}
              onChange={(event) => setRowCountSafely(Number(event.target.value))}
            />
          </label>
          <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
            <span>{tableLocale.columns}</span>
            <input
              aria-label={tableLocale.columns}
              className="h-9 w-20 rounded-md border border-slate-300 bg-white px-2 text-sm dark:border-slate-600 dark:bg-slate-800"
              type="number"
              min={0}
              max={columns.length}
              value={effectiveColumnCount}
              onChange={(event) => setColumnCountSafely(Number(event.target.value))}
            />
          </label>
        </div>
      )}

      <div
        className={mergeClassNames(
          "rounded-xl border border-slate-200 shadow-sm dark:border-slate-700",
          responsive ? "w-full overflow-x-auto" : "w-full"
        )}
      >
        <table className={mergeClassNames("min-w-full divide-y divide-slate-200 dark:divide-slate-700", tableClassName)}>
          <thead 
            className={mergeClassNames(getTheadBgClass(theadBg), theadClassName)}
            style={customTheme?.headerBg ? { backgroundColor: isHexOrRgb(customTheme.headerBg) ? customTheme.headerBg : undefined } : undefined}
          >
            <tr>
              {selectedColumns.map((column, columnIndex) => (
                <th
                  key={column.id ?? `${column.header}-${columnIndex}`}
                  className={mergeClassNames(
                    "px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-700 dark:text-slate-100",
                    column.headerClassName
                  )}
                  style={customTheme?.headerTextColor ? { color: isHexOrRgb(customTheme.headerTextColor) ? customTheme.headerTextColor : undefined } : undefined}
                  scope="col"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody 
            className={mergeClassNames(getTbodyBgClass(tbodyBg), tbodyClassName)}
            style={customTheme?.bodyBg ? { backgroundColor: isHexOrRgb(customTheme.bodyBg) ? customTheme.bodyBg : undefined } : undefined}
          >
            {pagedData.length === 0 ? (
              <tr>
                <td
                  className="px-4 py-8 text-center text-sm text-slate-500 dark:text-slate-300"
                  colSpan={Math.max(1, selectedColumns.length)}
                >
                  {tableLocale.noData}
                </td>
              </tr>
            ) : (
              pagedData.map((row, rowIndex) => {
                const keyValue =
                  typeof rowKey === "function"
                    ? rowKey(row, rowIndex)
                    : rowKey
                      ? String(row[rowKey])
                      : rowIndex;

                return (
                  <tr
                    key={keyValue}
                    className="border-b border-slate-100 last:border-b-0 dark:border-slate-800"
                  >
                    {selectedColumns.map((column, columnIndex) => {
                      const value = getCellValue(row, rowIndex, column);

                      return (
                        <td
                          key={column.id ?? `${column.header}-${columnIndex}`}
                          className={mergeClassNames(
                            "px-4 py-3 text-sm text-slate-700 dark:text-slate-200",
                            column.className
                          )}
                          style={customTheme?.bodyTextColor ? { color: isHexOrRgb(customTheme.bodyTextColor) ? customTheme.bodyTextColor : undefined } : undefined}
                        >
                          {column.cell ? column.cell(value, row, rowIndex) : String(value ?? "")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {showPagination && (
        <div className="mt-3 flex flex-col gap-3 text-sm text-slate-700 dark:text-slate-200 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <label htmlFor="tabletailor-page-size">{tableLocale.rowsPerPage}</label>
            <select
              id="tabletailor-page-size"
              aria-label={tableLocale.rowsPerPage}
              className="h-9 rounded-md border border-slate-300 bg-white px-2 dark:border-slate-600 dark:bg-slate-800"
              value={activePageSize}
              onChange={(event) => setPageSizeSafely(Number(event.target.value))}
            >
              {pageSizeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span>{`${tableLocale.page} ${currentPage} ${tableLocale.of} ${totalPages}`}</span>
            <button
              type="button"
              className="h-9 rounded-md border border-slate-300 px-3 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600"
              onClick={() => setPageSafely(currentPage - 1)}
              disabled={currentPage <= 1}
            >
              {tableLocale.previous}
            </button>
            <button
              type="button"
              className="h-9 rounded-md border border-slate-300 px-3 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600"
              onClick={() => setPageSafely(currentPage + 1)}
              disabled={currentPage >= totalPages}
            >
              {tableLocale.next}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
