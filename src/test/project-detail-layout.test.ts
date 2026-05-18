import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const slugSrc = readFileSync(resolve(__dirname, "../../src/pages/projects/[slug].astro"), "utf-8");

describe("Project detail header-extras layout", () => {
  it("header-extras wrapper uses flex-col so buttons and tags stack vertically", () => {
    // The div wrapping both the button row and TagList must be a flex column
    expect(slugSrc).toContain("flex-col");
  });

  it("header-extras wrapper has a gap between the button row and the tag list", () => {
    // Without a gap the two groups are flush against each other
    expect(slugSrc).toMatch(/slot="header-extras"[\s\S]*?gap-/);
  });
});
