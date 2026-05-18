import { describe, expect, it } from "vitest";
import { buildPaginationUrls, generatePaginatedPaths } from "@/lib/paginated-routes";

describe("generatePaginatedPaths", () => {
  it("returns a single empty page when there are no items", () => {
    const result = generatePaginatedPaths([], 10);
    expect(result).toHaveLength(1);
    expect(result[0]).toEqual({
      params: { page: undefined },
      props: {
        items: [],
        currentPage: 1,
        totalPages: 0,
        hasNext: false,
        hasPrev: false,
      },
    });
  });

  it("paginates items correctly", () => {
    const items = Array.from({ length: 25 }, (_, i) => i);
    const result = generatePaginatedPaths(items, 10);
    expect(result).toHaveLength(3);
    expect(result[0].params.page).toBeUndefined();
    expect(result[1].params.page).toBe("2");
    expect(result[2].params.page).toBe("3");
    expect(result[0].props.items).toHaveLength(10);
    expect(result[2].props.items).toHaveLength(5);
  });

  it("handles exact page boundary", () => {
    const items = Array.from({ length: 20 }, (_, i) => i);
    const result = generatePaginatedPaths(items, 10);
    expect(result).toHaveLength(2);
    expect(result[1].params.page).toBe("2");
  });
});

describe("buildPaginationUrls", () => {
  it("returns correct prev/next URLs for blog", () => {
    const { prevUrl, nextUrl } = buildPaginationUrls("/blog", 2, true, true);
    expect(prevUrl).toBe("/blog");
    expect(nextUrl).toBe("/blog/3");
  });

  it("returns null prevUrl when on first page", () => {
    const { prevUrl, nextUrl } = buildPaginationUrls("/projects", 1, false, true);
    expect(prevUrl).toBeNull();
    expect(nextUrl).toBe("/projects/2");
  });

  it("returns null nextUrl on last page", () => {
    const { prevUrl, nextUrl } = buildPaginationUrls("/blog", 3, true, false);
    expect(prevUrl).toBe("/blog/2");
    expect(nextUrl).toBeNull();
  });

  it("handles page 2 prev going to base path", () => {
    const { prevUrl } = buildPaginationUrls("/blog", 2, true, false);
    expect(prevUrl).toBe("/blog");
  });

  it("handles page 3+ prev correctly", () => {
    const { prevUrl } = buildPaginationUrls("/projects", 4, true, false);
    expect(prevUrl).toBe("/projects/3");
  });
});
