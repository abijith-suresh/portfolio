import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const footerSrc = readFileSync(resolve(__dirname, "../../src/components/Footer.astro"), "utf-8");

describe("Footer", () => {
  it("has a top border for structural separation from the main content", () => {
    expect(footerSrc).toContain("border-t");
  });

  it("uses the design-system border token for the top border", () => {
    expect(footerSrc).toContain("border-[var(--color-border)]");
  });
});
