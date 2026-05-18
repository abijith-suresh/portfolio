import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const splitSectionSrc = readFileSync(
  resolve(__dirname, "../../src/components/SplitSection.astro"),
  "utf-8"
);

describe("SplitSection", () => {
  it("does not apply a left border to the right column", () => {
    expect(splitSectionSrc).not.toContain("border-l");
  });

  it("does not apply a border color token to the right column", () => {
    // The broken vertical rule must be removed — each section should not
    // independently draw a border segment
    expect(splitSectionSrc).not.toMatch(/md:border-\[var\(--color-border\)\]/);
  });

  it("retains the two-column grid layout", () => {
    expect(splitSectionSrc).toContain("md:grid-cols-[25%_1fr]");
  });
});
