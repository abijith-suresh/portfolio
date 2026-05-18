import { describe, expect, it } from "vitest";
import type { BreadcrumbItem } from "@/lib/types";

describe("ContentDetailPage", () => {
  it("accepts breadcrumb items via shared type", () => {
    const items: BreadcrumbItem[] = [
      { label: "Home", href: "/", icon: "fa6-solid:house" },
      { label: "Blog", href: "/blog", icon: "fa6-solid:book-open" },
      { label: "Test Post", icon: "fa6-solid:file-lines" },
    ];
    expect(items).toHaveLength(3);
    expect(items[0].href).toBe("/");
    expect(items[2].href).toBeUndefined();
  });

  it("accepts optional meta items for the header", () => {
    const metaItems = [
      { type: "date" as const, value: "Jan 15, 2025" },
      { type: "text" as const, value: "3 min read" },
    ];
    expect(metaItems).toHaveLength(2);
  });
});
