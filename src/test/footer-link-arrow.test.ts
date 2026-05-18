import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const globalCss = readFileSync(resolve(__dirname, "../../src/styles/global.css"), "utf-8");
const footerLinkSrc = readFileSync(
  resolve(__dirname, "../../src/components/FooterLink.astro"),
  "utf-8"
);

describe("FooterLink arrow direction", () => {
  it("internal links use → glyph and external links use ↗ glyph", () => {
    expect(footerLinkSrc).toContain("→");
    expect(footerLinkSrc).toContain("↗");
  });

  it("internal arrow moves only horizontally on hover (translateX)", () => {
    // .footer-link-arrow-internal hover should use only translateX
    expect(globalCss).toContain("footer-link-arrow-internal");
    const match = globalCss.match(/footer-link-arrow-internal[^}]*\{([^}]*)\}/s);
    expect(match).toBeTruthy();
    const hoverRule = globalCss.match(
      /footer-link:hover .footer-link-arrow-internal[^{]*\{([^}]*)\}/s
    );
    expect(hoverRule?.[1]).toMatch(/translateX/);
    expect(hoverRule?.[1]).not.toMatch(/translateY|translate\s*\(/);
  });

  it("external arrow moves diagonally on hover (translate with both axes)", () => {
    const hoverRule = globalCss.match(
      /footer-link:hover .footer-link-arrow-external[^{]*\{([^}]*)\}/s
    );
    expect(hoverRule?.[1]).toMatch(/translate\s*\(/);
  });
});
