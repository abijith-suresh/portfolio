import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const globalCss = readFileSync(resolve(__dirname, "../../src/styles/global.css"), "utf-8");

describe("dark-only theme system", () => {
  it("root --color-base is dark (#111111)", () => {
    // Extract the :root block
    const rootBlock = globalCss.match(/:root\s*\{([^}]*)\}/s)?.[1] ?? "";
    expect(rootBlock).toContain("--color-base: #111111");
  });

  it("root --color-text is light (#f4f4f4)", () => {
    const rootBlock = globalCss.match(/:root\s*\{([^}]*)\}/s)?.[1] ?? "";
    expect(rootBlock).toContain("--color-text: #f4f4f4");
  });

  it("has no [data-theme='dark'] conditional override block", () => {
    expect(globalCss).not.toContain("[data-theme");
  });

  it("has no dark: Tailwind utility prefix in CSS", () => {
    expect(globalCss).not.toContain("dark:");
  });

  it("@theme inline block uses dark base color", () => {
    const themeBlock = globalCss.match(/@theme inline\s*\{([^}]*)\}/s)?.[1] ?? "";
    expect(themeBlock).toContain("--color-base: #111111");
  });

  it("@theme inline block uses light text color", () => {
    const themeBlock = globalCss.match(/@theme inline\s*\{([^}]*)\}/s)?.[1] ?? "";
    expect(themeBlock).toContain("--color-text: #f4f4f4");
  });
});
