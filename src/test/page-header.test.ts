import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const pageHeaderSrc = readFileSync(
  resolve(__dirname, "../../src/components/ui/PageHeader.astro"),
  "utf-8"
);

describe("PageHeader", () => {
  it("renders an accent rule element between eyebrow and h1", () => {
    // Must contain the same structural anchor pattern as the Hero section
    expect(pageHeaderSrc).toContain("border-[var(--color-accent)]");
  });

  it("accent rule only appears when an eyebrow label is present", () => {
    // The rule and the eyebrow should be co-located in the same conditional block
    const eyebrowBlock = pageHeaderSrc.match(/\{eyebrow[^}]*\}/s)?.[0] ?? "";
    expect(eyebrowBlock).toBeTruthy();
    // The accent border should live inside the eyebrow conditional
    const eyebrowSection = pageHeaderSrc.slice(
      pageHeaderSrc.indexOf("{eyebrow"),
      pageHeaderSrc.indexOf("{subtitle") > -1
        ? pageHeaderSrc.indexOf("{subtitle")
        : pageHeaderSrc.length
    );
    expect(eyebrowSection).toContain("color-accent");
  });

  it("retains the h1 with fluid clamp sizing", () => {
    expect(pageHeaderSrc).toContain("clamp(");
  });
});
