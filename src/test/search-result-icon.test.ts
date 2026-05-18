import { describe, expect, it } from "vitest";
import { getSearchResultIconSvg } from "@/lib/search-result-icon";

describe("getSearchResultIconSvg", () => {
  it("returns code icon for 'code' type", () => {
    const svg = getSearchResultIconSvg("code");
    expect(svg).toContain("svg");
    expect(svg).toContain("viewBox");
  });

  it("returns file icon for non-code type", () => {
    const svg = getSearchResultIconSvg("file-text");
    expect(svg).toContain("svg");
    expect(svg).toContain("viewBox");
  });

  it("uses --color-muted token for icon colour", () => {
    const svgCode = getSearchResultIconSvg("code");
    const svgFile = getSearchResultIconSvg("file-text");
    expect(svgCode).toContain("var(--color-muted)");
    expect(svgFile).toContain("var(--color-muted)");
  });
});
