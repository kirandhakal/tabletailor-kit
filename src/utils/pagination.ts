export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function getTotalPages(totalItems: number, pageSize: number): number {
  if (totalItems <= 0) {
    return 1;
  }

  return Math.max(1, Math.ceil(totalItems / Math.max(1, pageSize)));
}

export function paginateData<T>(data: T[], page: number, pageSize: number): T[] {
  const safePageSize = Math.max(1, pageSize);
  const start = (Math.max(1, page) - 1) * safePageSize;
  return data.slice(start, start + safePageSize);
}
