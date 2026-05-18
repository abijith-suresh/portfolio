import { describe, expect, it } from "vitest";
import { calloutConfig } from "@/lib/callout-config";

describe("Callout config", () => {
  it("has exactly four variants", () => {
    expect(Object.keys(calloutConfig)).toEqual(["note", "tip", "warning", "danger"]);
  });

  it("each variant has an icon, border class, and bg class", () => {
    for (const [_variant, config] of Object.entries(calloutConfig)) {
      expect(config.icon).toBeTruthy();
      expect(config.borderClass).toBeTruthy();
      expect("bgClass" in config).toBe(true);
    }
  });

  it("uses only design-system tokens (no Tailwind default colours)", () => {
    const configValues = JSON.stringify(calloutConfig);
    // Must not contain Tailwind default colour classes
    expect(configValues).not.toMatch(/blue-\d/);
    expect(configValues).not.toMatch(/green-\d/);
    expect(configValues).not.toMatch(/red-\d/);
    expect(configValues).not.toMatch(/amber-\d/);
    // Must not contain dark: overrides
    expect(configValues).not.toContain("dark:");
  });

  it("warning and danger have distinct border classes from note and tip", () => {
    expect(calloutConfig.warning.borderClass).not.toBe(calloutConfig.note.borderClass);
    expect(calloutConfig.danger.borderClass).not.toBe(calloutConfig.note.borderClass);
    expect(calloutConfig.warning.borderClass).not.toBe(calloutConfig.danger.borderClass);
  });

  it("warning and danger have non-empty background classes", () => {
    expect(calloutConfig.warning.bgClass).toBeTruthy();
    expect(calloutConfig.danger.bgClass).toBeTruthy();
  });

  it("note and tip have empty background classes (informational, no tint)", () => {
    expect(calloutConfig.note.bgClass).toBe("");
    expect(calloutConfig.tip.bgClass).toBe("");
  });
});
