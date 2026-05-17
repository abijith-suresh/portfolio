import { describe, expect, it } from "vitest";

import { groupByFirstLetter } from "@/lib/group-by-letter";

describe("groupByFirstLetter", () => {
  it("groups items by the first letter of the label", () => {
    const items = [
      { label: "Astro", count: 3 },
      { label: "Accessibility", count: 1 },
      { label: "Backend", count: 2 },
      { label: "Spring Boot", count: 4 },
    ];

    const result = groupByFirstLetter(items, (item) => item.label);

    expect(result).toEqual([
      {
        letter: "A",
        items: [
          { label: "Accessibility", count: 1 },
          { label: "Astro", count: 3 },
        ],
      },
      { letter: "B", items: [{ label: "Backend", count: 2 }] },
      { letter: "S", items: [{ label: "Spring Boot", count: 4 }] },
    ]);
  });

  it("returns an empty array for empty input", () => {
    expect(groupByFirstLetter([], (item: { label: string }) => item.label)).toEqual([]);
  });

  it("is case-insensitive when grouping", () => {
    const items = [
      { label: "astro", count: 1 },
      { label: "Astro", count: 2 },
    ];

    const result = groupByFirstLetter(items, (item) => item.label);

    expect(result).toEqual([
      {
        letter: "A",
        items: [
          { label: "astro", count: 1 },
          { label: "Astro", count: 2 },
        ],
      },
    ]);
  });

  it("sorts groups alphabetically by letter", () => {
    const items = [
      { label: "TypeScript", count: 1 },
      { label: "Astro", count: 2 },
      { label: "Bun", count: 3 },
    ];

    const result = groupByFirstLetter(items, (item) => item.label);

    expect(result.map((g) => g.letter)).toEqual(["A", "B", "T"]);
  });

  it("sorts items within each group alphabetically by label", () => {
    const items = [
      { label: "Spring Boot", count: 1 },
      { label: "Security", count: 2 },
      { label: "Svelte", count: 3 },
    ];

    const result = groupByFirstLetter(items, (item) => item.label);

    expect(result[0].items.map((i) => i.label)).toEqual(["Security", "Spring Boot", "Svelte"]);
  });
});
