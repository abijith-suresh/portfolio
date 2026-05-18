import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const aboutSrc = readFileSync(resolve(__dirname, "../../src/pages/about.astro"), "utf-8");

describe("About page identity block", () => {
  it("has an eyebrow label above the name heading", () => {
    expect(aboutSrc).toContain("eyebrow");
  });

  it("has an accent rule structural anchor (same grammar as Hero)", () => {
    expect(aboutSrc).toContain("border-[var(--color-accent)]");
  });

  it("renders the name at Hero scale with clamp sizing", () => {
    expect(aboutSrc).toContain("clamp(3.5rem");
  });

  it("identity block is NOT wrapped in a SplitSection", () => {
    // The identity (name + eyebrow + rule) should be a standalone block,
    // not crammed into the right column of a 25/75 split
    const firstUsage = aboutSrc.indexOf("<SplitSection");
    const identityRegion = aboutSrc.slice(0, firstUsage);
    expect(identityRegion).toContain("AUTHOR.fullName");
  });

  it("avatar image is present", () => {
    expect(aboutSrc).toContain("AUTHOR.avatar");
  });
});
