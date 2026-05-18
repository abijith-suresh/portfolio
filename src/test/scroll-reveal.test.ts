import { beforeEach, describe, expect, it } from "vitest";
import { applyRevealClasses, buildRevealConfig, shouldSkipReveal } from "@/lib/scroll-reveal";

describe("scroll-reveal logic", () => {
  describe("buildRevealConfig", () => {
    it("returns defaults when no overrides", () => {
      const config = buildRevealConfig();
      expect(config.selector).toBe("[data-scroll-reveal]");
      expect(config.revealClass).toBe("scroll-revealed");
      expect(config.maxStagger).toBe(4);
      expect(config.threshold).toBe(0.1);
    });

    it("merges overrides with defaults", () => {
      const config = buildRevealConfig({ maxStagger: 6, threshold: 0.2 });
      expect(config.maxStagger).toBe(6);
      expect(config.threshold).toBe(0.2);
      expect(config.selector).toBe("[data-scroll-reveal]"); // default preserved
    });
  });

  describe("applyRevealClasses", () => {
    let elements: Element[];
    const config = buildRevealConfig();

    beforeEach(() => {
      elements = Array.from({ length: 5 }, () => document.createElement("div"));
    });

    it("applies reveal class to each element", () => {
      const result = applyRevealClasses(elements, config);
      for (const [, classes] of result) {
        expect(classes).toContain(config.revealClass);
      }
    });

    it("applies stagger class based on position", () => {
      const result = applyRevealClasses(elements, config);
      const entries = [...result.entries()];

      expect(entries[0][1]).toContain("scroll-stagger-1");
      expect(entries[1][1]).toContain("scroll-stagger-2");
      expect(entries[2][1]).toContain("scroll-stagger-3");
    });

    it("caps stagger at maxStagger", () => {
      const result = applyRevealClasses(elements, config);
      const entries = [...result.entries()];
      // element at index 4 → min(5, 4) = 4
      expect(entries[4][1]).toContain("scroll-stagger-4");
      // never produces stagger-5
      for (const [, classes] of result) {
        expect(classes).not.toContain("scroll-stagger-5");
      }
    });

    it("handles empty element list", () => {
      const result = applyRevealClasses([], config);
      expect(result.size).toBe(0);
    });
  });

  describe("shouldSkipReveal", () => {
    it("returns false for a fresh element", () => {
      const el = document.createElement("div");
      expect(shouldSkipReveal(el)).toBe(false);
    });

    it("returns true if element already has reveal class", () => {
      const el = document.createElement("div");
      el.classList.add("scroll-revealed");
      expect(shouldSkipReveal(el)).toBe(true);
    });
  });
});
