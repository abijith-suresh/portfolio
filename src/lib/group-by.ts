type GroupResult<K, T> = {
  key: K;
  items: T[];
};

/**
 * Generic groupBy — groups items by a key extracted via `getKey`.
 *
 * - Numeric keys sort descending (e.g. years: 2026, 2025, 2024)
 * - String keys sort ascending (e.g. letters: A, B, C)
 * - Within each group, items preserve insertion order unless `getLabel`
 *   is provided, in which case items sort ascending by label.
 */
export function groupBy<T, K extends number | string>(
  items: T[],
  getKey: (item: T) => K,
  getLabel?: (item: T) => string
): GroupResult<K, T>[] {
  const groups = new Map<K, T[]>();

  for (const item of items) {
    const key = getKey(item);
    const group = groups.get(key);
    if (group) {
      group.push(item);
    } else {
      groups.set(key, [item]);
    }
  }

  return Array.from(groups.entries())
    .sort(([a], [b]) => {
      if (typeof a === "number" && typeof b === "number") {
        return b - a; // numeric: descending
      }
      return String(a).localeCompare(String(b)); // string: ascending
    })
    .map(([key, groupItems]) => ({
      key,
      items: getLabel
        ? groupItems.sort((a, b) => getLabel(a).localeCompare(getLabel(b)))
        : groupItems,
    }));
}
