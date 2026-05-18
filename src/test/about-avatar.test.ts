import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const aboutSrc = readFileSync(resolve(__dirname, "../../src/pages/about.astro"), "utf-8");

describe("About page identity block — side-by-side layout", () => {
  it("identity block uses a grid or flex for side-by-side text/image layout", () => {
    // Must use a multi-column layout so text and image sit beside each other
    expect(aboutSrc).toMatch(/md:grid-cols|md:flex-row/);
  });

  it("avatar image is rendered at a significantly larger size than 96px", () => {
    // Previous size was w-24 h-24 (96px); new layout should be visibly larger
    // Check for any Tailwind size class larger than w-24
    expect(aboutSrc).toMatch(/w-3[2-9]|w-4\d|w-5\d|w-6\d/);
  });

  it("avatar image is present and references AUTHOR.avatar", () => {
    expect(aboutSrc).toContain("AUTHOR.avatar");
  });

  it("identity text content (eyebrow, rule, name, tagline) is in the left column", () => {
    // The text block should appear before the image in source order
    const imgPos = aboutSrc.indexOf("AUTHOR.avatar");
    const namePos = aboutSrc.indexOf("AUTHOR.fullName");
    expect(namePos).toBeLessThan(imgPos);
  });

  it("image stacks below text on mobile (order-last or default source order)", () => {
    // On mobile the grid collapses to a single column; image should come after
    // the text. Either via default source order or an explicit md:order class.
    // The image must NOT have order-first without a compensating md:order-last.
    const hasOrderFirst = aboutSrc.match(/order-first[\s\S]{0,80}AUTHOR\.avatar/);
    if (hasOrderFirst) {
      expect(aboutSrc).toContain("md:order-last");
    } else {
      // If no order-first, source order is fine (image comes after text)
      expect(true).toBe(true);
    }
  });

  it("image uses object-cover to maintain portrait aspect ratio", () => {
    expect(aboutSrc).toContain("object-cover");
  });
});
