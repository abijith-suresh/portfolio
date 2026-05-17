type LetterGroup<T> = {
  letter: string;
  items: T[];
};

export function groupByFirstLetter<T>(items: T[], getLabel: (item: T) => string): LetterGroup<T>[] {
  const groups = new Map<string, T[]>();

  for (const item of items) {
    const label = getLabel(item);
    const letter = label.charAt(0).toUpperCase();
    const group = groups.get(letter);
    if (group) {
      group.push(item);
    } else {
      groups.set(letter, [item]);
    }
  }

  return Array.from(groups.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([letter, items]) => ({
      letter,
      items: items.sort((a, b) => getLabel(a).localeCompare(getLabel(b))),
    }));
}
