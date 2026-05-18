import { describe, expect, it } from "vitest";

import { groupBy } from "@/lib/group-by";

describe("groupBy", () => {
  it("groups items by numeric key and sorts descending", () => {
    const items = [
      { title: "Post A", date: new Date("2025-01-15") },
      { title: "Post B", date: new Date("2026-03-10") },
      { title: "Post C", date: new Date("2025-06-20") },
    ];

    const result = groupBy(items, (item) => item.date.getFullYear());

    expect(result).toEqual([
      { key: 2026, items: [{ title: "Post B", date: new Date("2026-03-10") }] },
      {
        key: 2025,
        items: [
          { title: "Post A", date: new Date("2025-01-15") },
          { title: "Post C", date: new Date("2025-06-20") },
        ],
      },
    ]);
  });

  it("groups items by string key and sorts ascending", () => {
    const items = [
      { label: "TypeScript", count: 1 },
      { label: "Astro", count: 2 },
      { label: "Bun", count: 3 },
    ];

    const result = groupBy(items, (item) => item.label.charAt(0).toUpperCase());

    expect(result).toEqual([
      { key: "A", items: [{ label: "Astro", count: 2 }] },
      { key: "B", items: [{ label: "Bun", count: 3 }] },
      { key: "T", items: [{ label: "TypeScript", count: 1 }] },
    ]);
  });

  it("returns an empty array for empty input", () => {
    expect(groupBy([], (item: { x: number }) => item.x)).toEqual([]);
  });

  it("preserves insertion order within groups for numeric keys", () => {
    const items = [
      { name: "first", year: 2025 },
      { name: "second", year: 2025 },
      { name: "third", year: 2025 },
    ];

    const result = groupBy(items, (item) => item.year);

    expect(result[0].items.map((i) => i.name)).toEqual(["first", "second", "third"]);
  });

  it("sorts items within string-key groups by label when a label accessor is provided", () => {
    const items = [
      { label: "Spring Boot", count: 1 },
      { label: "Security", count: 2 },
      { label: "Svelte", count: 3 },
    ];

    const result = groupBy(
      items,
      (item) => item.label.charAt(0).toUpperCase(),
      (item) => item.label
    );

    expect(result[0].items.map((i) => i.label)).toEqual(["Security", "Spring Boot", "Svelte"]);
  });

  it("handles a single group", () => {
    const items = [
      { tag: "A", n: 1 },
      { tag: "Apple", n: 2 },
    ];

    const result = groupBy(items, (item) => item.tag.charAt(0));

    expect(result).toEqual([
      {
        key: "A",
        items: [
          { tag: "A", n: 1 },
          { tag: "Apple", n: 2 },
        ],
      },
    ]);
  });

  it("sorts numeric keys descending and string keys ascending", () => {
    const numItems = [
      { v: 1, year: 2024 },
      { v: 2, year: 2026 },
      { v: 3, year: 2025 },
    ];

    const numResult = groupBy(numItems, (item) => item.year);
    expect(numResult.map((g) => g.key)).toEqual([2026, 2025, 2024]);

    const strItems = [
      { v: 1, ch: "C" },
      { v: 2, ch: "A" },
      { v: 3, ch: "B" },
    ];

    const strResult = groupBy(strItems, (item) => item.ch);
    expect(strResult.map((g) => g.key)).toEqual(["A", "B", "C"]);
  });
});
