import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const src = readFileSync(
  resolve(__dirname, "../../src/components/ContentDetailPage.astro"),
  "utf-8"
);

describe("ContentDetailPage hero section", () => {
  it("accepts a category eyebrow prop", () => {
    expect(src).toContain("eyebrow");
  });

  it("renders an accent rule between the eyebrow and title", () => {
    expect(src).toContain("border-[var(--color-accent)]");
  });

  it("renders a full-width horizontal divider between header and prose", () => {
    // The editorial divider that separates the framing from the content
    expect(src).toContain("border-t");
    expect(src).toContain("border-[var(--color-border)]");
  });

  it("title uses fluid clamp sizing (smaller than landing hero)", () => {
    // The detail page title uses clamp() for fluid sizing.
    // It is intentionally smaller than the landing hero (min 3.5rem, max 6rem)
    // to maintain typographic hierarchy across the site.
    expect(src).toContain("clamp(");
  });

  it("eyebrow and accent rule are co-located (eyebrow implies rule)", () => {
    // Both must appear before the h1
    const h1Pos = src.indexOf("<h1");
    const eyebrowPos = src.indexOf("eyebrow");
    const accentPos = src.indexOf("color-accent");
    expect(eyebrowPos).toBeGreaterThan(0);
    expect(accentPos).toBeGreaterThan(0);
    expect(eyebrowPos).toBeLessThan(h1Pos);
    expect(accentPos).toBeLessThan(h1Pos);
  });
});
