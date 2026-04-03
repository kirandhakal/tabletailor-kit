import type { LocaleCode, TableLocale } from "../types";

const locales: Record<LocaleCode, TableLocale> = {
  en: {
    rowsPerPage: "Rows per page",
    previous: "Previous",
    next: "Next",
    page: "Page",
    of: "of",
    noData: "No data available",
    rows: "Rows",
    columns: "Columns"
  },
  es: {
    rowsPerPage: "Filas por pagina",
    previous: "Anterior",
    next: "Siguiente",
    page: "Pagina",
    of: "de",
    noData: "No hay datos",
    rows: "Filas",
    columns: "Columnas"
  },
  fr: {
    rowsPerPage: "Lignes par page",
    previous: "Precedent",
    next: "Suivant",
    page: "Page",
    of: "sur",
    noData: "Aucune donnee",
    rows: "Lignes",
    columns: "Colonnes"
  }
};

export function resolveLocale(locale: LocaleCode = "en", overrides?: Partial<TableLocale>): TableLocale {
  return {
    ...locales.en,
    ...locales[locale],
    ...overrides
  };
}
