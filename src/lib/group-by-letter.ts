import { groupBy } from "@/lib/group-by";

type LetterGroup<T> = {
  letter: string;
  items: T[];
};

export function groupByFirstLetter<T>(items: T[], getLabel: (item: T) => string): LetterGroup<T>[] {
  return groupBy(
    items,
    (item) => getLabel(item).charAt(0).toUpperCase(),
    (item) => getLabel(item)
  ).map((group) => ({
    letter: group.key,
    items: group.items,
  }));
}
