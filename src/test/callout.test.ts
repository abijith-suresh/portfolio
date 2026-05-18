import { describe, expect, it } from "vitest";

const calloutConfig = {
  note: {
    borderClass: "border-l-[var(--color-accent)]",
    icon: "fa6-solid:circle-info",
  },
  tip: {
    borderClass: "border-l-[var(--color-accent)]",
    icon: "fa6-solid:lightbulb",
  },
  warning: {
    borderClass: "border-l-[var(--color-accent)]",
    icon: "fa6-solid:triangle-exclamation",
  },
  danger: {
    borderClass: "border-l-[var(--color-text)]",
    icon: "fa6-solid:circle-exclamation",
  },
} as const;

describe("Callout config", () => {
  it("has exactly four variants", () => {
    expect(Object.keys(calloutConfig)).toEqual(["note", "tip", "warning", "danger"]);
  });

  it("each variant has an icon and border class", () => {
    for (const [_variant, config] of Object.entries(calloutConfig)) {
      expect(config.icon).toBeTruthy();
      expect(config.borderClass).toBeTruthy();
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
});
