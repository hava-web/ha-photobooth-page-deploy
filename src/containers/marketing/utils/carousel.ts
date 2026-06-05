export const normalizeIndex = (index: number, count: number) =>
  count > 0 ? (index + count) % count : 0;

export const getPagedItems = <T>(
  items: T[],
  page: number,
  pageSize: number,
) => {
  const start = page * pageSize;
  return items.slice(start, start + pageSize);
};

export const getPageCount = (itemsLength: number, pageSize: number) =>
  Math.max(1, Math.ceil(itemsLength / pageSize));

export const getRotatedPageItems = <T>(
  items: T[],
  page: number,
  pageSize: number,
) => {
  if (!items.length) {
    return [];
  }

  const start = (page * 3) % items.length;

  return Array.from(
    { length: pageSize },
    (_, index) => items[(start + index) % items.length],
  );
};

export const getLoopItem = <T>(items: T[], index: number) =>
  items[normalizeIndex(index, items.length)];
