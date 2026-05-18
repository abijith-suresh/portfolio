import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const globalCss = readFileSync(resolve(__dirname, "../../src/styles/global.css"), "utf-8");

describe("Button secondary variant", () => {
  it("has a visible border in resting state", () => {
    // btn-secondary needs a border so it reads as a button shape on the dark background,
    // not invisible floating text beside a filled primary button
    const match = globalCss.match(/\.btn-secondary\s*\{([^}]+)\}/s);
    expect(match).not.toBeNull();
    expect(match![1]).toMatch(/border/);
  });

  it("border is based on the text color token for strong contrast", () => {
    const match = globalCss.match(/\.btn-secondary\s*\{([^}]+)\}/s);
    expect(match![1]).toContain("--color-text");
  });

  it("hover state removes the border to let the amber fill read cleanly", () => {
    const match = globalCss.match(/\.btn-secondary:hover\s*\{([^}]+)\}/s);
    expect(match).not.toBeNull();
    expect(match![1]).toMatch(/border-color:\s*transparent/);
  });
});
