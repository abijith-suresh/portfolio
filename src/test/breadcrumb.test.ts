import { describe, expect, it } from "vitest";
import type { BreadcrumbItem } from "@/lib/types";

describe("BreadcrumbItem", () => {
  it("accepts an item with all fields", () => {
    const item: BreadcrumbItem = {
      label: "Home",
      href: "/",
      icon: "fa6-solid:house",
    };
    expect(item.label).toBe("Home");
    expect(item.href).toBe("/");
    expect(item.icon).toBe("fa6-solid:house");
  });

  it("accepts an item with only label (current page)", () => {
    const item: BreadcrumbItem = {
      label: "About",
    };
    expect(item.label).toBe("About");
    expect(item.href).toBeUndefined();
    expect(item.icon).toBeUndefined();
  });
});
