import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const heroSrc = readFileSync(resolve(__dirname, "../../src/components/Hero.astro"), "utf-8");
const aboutSrc = readFileSync(resolve(__dirname, "../../src/pages/about.astro"), "utf-8");
const contentDetailSrc = readFileSync(
  resolve(__dirname, "../../src/components/ContentDetailPage.astro"),
  "utf-8"
);
const pageHeaderSrc = readFileSync(
  resolve(__dirname, "../../src/components/ui/PageHeader.astro"),
  "utf-8"
);
const notFoundSrc = readFileSync(resolve(__dirname, "../../src/pages/404.astro"), "utf-8");

describe("Typographic scale hierarchy", () => {
  // Landing hero stays at its original prominent size
  it("landing Hero h1 keeps the large clamp(3.5rem, 8vw, 6rem) scale", () => {
    expect(heroSrc).toContain("clamp(3.5rem,8vw,6rem)");
  });

  // About identity — same clamp as landing was wrong; must now be clearly smaller
  it("about page h1 is smaller than the landing hero (max 4rem)", () => {
    const match = aboutSrc.match(/clamp\(([^)]+)\)/);
    expect(match).not.toBeNull();
    const parts = match![1].split(",");
    const max = parseFloat(parts[parts.length - 1]);
    // max must be ≤ 4rem — landing max is 6rem
    expect(max).toBeLessThanOrEqual(4);
  });

  it("about page h1 no longer matches the landing hero clamp", () => {
    expect(aboutSrc).not.toContain("clamp(3.5rem,8vw,6rem)");
  });

  // ContentDetailPage — should be clearly smaller than landing
  it("ContentDetailPage h1 max is ≤ 3.5rem", () => {
    const match = contentDetailSrc.match(/clamp\(([^)]+)\)/);
    expect(match).not.toBeNull();
    const parts = match![1].split(",");
    const max = parseFloat(parts[parts.length - 1]);
    expect(max).toBeLessThanOrEqual(3.5);
  });

  // PageHeader — list pages; should be the smallest tier
  it("PageHeader h1 max is ≤ 3rem", () => {
    const match = pageHeaderSrc.match(/clamp\(([^)]+)\)/);
    expect(match).not.toBeNull();
    const parts = match![1].split(",");
    const max = parseFloat(parts[parts.length - 1]);
    expect(max).toBeLessThanOrEqual(3);
  });

  // 404 should match PageHeader tier
  it("404 h1 max is ≤ 3rem matching the list-page tier", () => {
    const match = notFoundSrc.match(/clamp\(([^)]+)\)/);
    expect(match).not.toBeNull();
    const parts = match![1].split(",");
    const max = parseFloat(parts[parts.length - 1]);
    expect(max).toBeLessThanOrEqual(3);
  });

  // Hierarchy: about > content-detail > page-header
  it("about h1 max is larger than ContentDetailPage h1 max", () => {
    const aboutMax = parseFloat(
      aboutSrc
        .match(/clamp\(([^)]+)\)/)![1]
        .split(",")
        .at(-1)!
    );
    const detailMax = parseFloat(
      contentDetailSrc
        .match(/clamp\(([^)]+)\)/)![1]
        .split(",")
        .at(-1)!
    );
    expect(aboutMax).toBeGreaterThan(detailMax);
  });

  it("ContentDetailPage h1 max is larger than PageHeader h1 max", () => {
    const detailMax = parseFloat(
      contentDetailSrc
        .match(/clamp\(([^)]+)\)/)![1]
        .split(",")
        .at(-1)!
    );
    const headerMax = parseFloat(
      pageHeaderSrc
        .match(/clamp\(([^)]+)\)/)![1]
        .split(",")
        .at(-1)!
    );
    expect(detailMax).toBeGreaterThan(headerMax);
  });
});
