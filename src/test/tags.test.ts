import { describe, expect, it } from "vitest";

import { getTagHref, normalizeTagCounts, slugifyTag } from "@/lib/tags";

describe("tag utilities", () => {
  it("creates canonical slugs for tag routes", () => {
    expect(slugifyTag("Tailwind CSS")).toBe("tailwind-css");
    expect(getTagHref("Web Development")).toBe("/tags/web-development");
  });

  it("merges tag counts that normalize to the same slug", () => {
    expect(
      normalizeTagCounts([
        { tag: "Astro", count: 2 },
        { tag: "astro", count: 1 },
        { tag: "Tailwind CSS", count: 3 },
      ])
    ).toEqual([
      { slug: "astro", label: "Astro", count: 3 },
      { slug: "tailwind-css", label: "Tailwind CSS", count: 3 },
    ]);
  });
});
