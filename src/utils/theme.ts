import type { BackgroundToken, TableTheme, CustomTheme } from "../types";

const theadBgClassMap: Record<BackgroundToken, string> = {
  default: "bg-slate-100 dark:bg-slate-800",
  slate: "bg-slate-200 dark:bg-slate-700",
  zinc: "bg-zinc-200 dark:bg-zinc-700",
  neutral: "bg-neutral-200 dark:bg-neutral-700",
  stone: "bg-stone-200 dark:bg-stone-700"
};

const tbodyBgClassMap: Record<BackgroundToken, string> = {
  default: "bg-white dark:bg-slate-900",
  slate: "bg-slate-50 dark:bg-slate-900",
  zinc: "bg-zinc-50 dark:bg-zinc-900",
  neutral: "bg-neutral-50 dark:bg-neutral-900",
  stone: "bg-stone-50 dark:bg-stone-900"
};

export function getThemeClass(theme: TableTheme): string {
  if (theme === "light") {
    return "tabletailor-light";
  }

  if (theme === "dark") {
    return "dark tabletailor-dark";
  }

  return "";
}

export function getTheadBgClass(token: BackgroundToken): string {
  return theadBgClassMap[token];
}

export function getTbodyBgClass(token: BackgroundToken): string {
  return tbodyBgClassMap[token];
}

export function mergeClassNames(...classes: Array<string | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Convert custom theme values to inline styles
 * Supports both hex colors, rgb, and Tailwind class names
 */
export function getCustomThemeStyles(customTheme?: CustomTheme): React.CSSProperties {
  const styles: React.CSSProperties = {};

  if (customTheme?.headerBg) {
    styles.backgroundColor = isHexOrRgb(customTheme.headerBg) ? customTheme.headerBg : undefined;
  }

  if (customTheme?.headerTextColor) {
    styles.color = isHexOrRgb(customTheme.headerTextColor) ? customTheme.headerTextColor : undefined;
  }

  if (customTheme?.bodyBg) {
    styles.backgroundColor = isHexOrRgb(customTheme.bodyBg) ? customTheme.bodyBg : undefined;
  }

  if (customTheme?.bodyTextColor) {
    styles.color = isHexOrRgb(customTheme.bodyTextColor) ? customTheme.bodyTextColor : undefined;
  }

  if (customTheme?.borderColor) {
    styles.borderColor = isHexOrRgb(customTheme.borderColor) ? customTheme.borderColor : undefined;
  }

  if (customTheme?.fontFamily) {
    styles.fontFamily = customTheme.fontFamily;
  }

  return styles;
}

function isHexOrRgb(value: string): boolean {
  return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value) || /^rgb/.test(value);
}
