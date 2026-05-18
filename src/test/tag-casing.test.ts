import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const globalCss = readFileSync(resolve(__dirname, "../../src/styles/global.css"), "utf-8");
const tagsPageSrc = readFileSync(resolve(__dirname, "../../src/pages/tags/index.astro"), "utf-8");

describe("Tag casing consistency", () => {
  it("tag-pill has text-transform uppercase", () => {
    // Match a .tag-pill block that starts on its own line (standalone rule, not nested)
    const match = globalCss.match(/^\s+\.tag-pill\s*\{([^}]+)\}/m);
    expect(match).not.toBeNull();
    expect(match![1]).toContain("text-transform: uppercase");
  });

  it("tag-link has text-transform uppercase matching tag-pill", () => {
    // The tags index page uses .tag-link; it must also be uppercased for visual
    // consistency with .tag-pill used everywhere else
    const linkIdx = globalCss.indexOf(".tag-link {");
    const linkBlock = globalCss.slice(linkIdx, globalCss.indexOf("}", linkIdx) + 1);
    expect(linkBlock).toContain("text-transform: uppercase");
  });

  it("tags index page uses the tag-link class", () => {
    expect(tagsPageSrc).toContain("tag-link");
  });
});
