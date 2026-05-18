import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const footerSrc = readFileSync(resolve(__dirname, "../../src/components/Footer.astro"), "utf-8");

describe("Footer layout", () => {
  it("uses items-center on desktop row to vertically centre social links and copyright", () => {
    expect(footerSrc).toContain("md:items-center");
  });

  it("does not use items-end on desktop row", () => {
    expect(footerSrc).not.toContain("md:items-end");
  });
});
