import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const headerSrc = readFileSync(resolve(__dirname, "../../src/components/Header.astro"), "utf-8");

describe("Mobile nav animation", () => {
  it("overlay has an opacity transition", () => {
    expect(headerSrc).toContain("mobile-nav-overlay");
    // Overlay should use opacity-based CSS transition, not just hidden toggle
    expect(headerSrc).toMatch(
      /mobile-nav-overlay[\s\S]*?transition|transition[\s\S]*?mobile-nav-overlay/
    );
  });

  it("drawer uses a translateX slide-in transition", () => {
    expect(headerSrc).toContain("translateX");
  });

  it("drawer slide direction is from the right", () => {
    // Initial state should be translate to the right (positive X = 100%)
    expect(headerSrc).toContain("translateX(100%)");
  });

  it("respects prefers-reduced-motion", () => {
    expect(headerSrc).toContain("prefers-reduced-motion");
  });
});
