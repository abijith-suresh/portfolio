import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const footerSrc = readFileSync(resolve(__dirname, "../../src/components/Footer.astro"), "utf-8");

describe("Footer proportion", () => {
  it("uses py-8 padding to stay proportionate with the header height", () => {
    expect(footerSrc).toContain("py-8");
  });

  it("does not use py-12 which made the footer disproportionately tall", () => {
    expect(footerSrc).not.toContain("py-12");
  });
});
