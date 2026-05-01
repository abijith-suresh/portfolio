import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { SearchIndexPayload, SearchResult } from "@/lib/search/types";
import {
  clearCallbacks,
  clearSearchIndex,
  getAllData,
  initSearchIndex,
  search,
  setCallbacks,
} from "@/lib/flexsearch";

function createResult(overrides: Partial<SearchResult> = {}): SearchResult {
  return {
    id: "post-1",
    title: "Spring search",
    description: "Custom search for Astro",
    date: "2026-05-01T00:00:00.000Z",
    tags: ["Astro"],
    url: "/blog/post-1",
    content: "Search inside Spring Boot content",
    type: "blog",
    ...overrides,
  };
}

function createPayload(signature: string, results: SearchResult[]): SearchIndexPayload {
  return {
    generatedAt: "2026-05-01T00:00:00.000Z",
    signature,
    results,
  };
}

describe("flexsearch index", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    localStorage.clear();
    clearCallbacks();
    clearSearchIndex();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
    clearCallbacks();
    clearSearchIndex();
    localStorage.clear();
  });

  it("uses cached results immediately and refreshes them in the background", async () => {
    const cachedPayload = createPayload("old-signature", [createResult({ id: "cached-post" })]);
    const freshPayload = createPayload("new-signature", [createResult({ id: "fresh-post" })]);

    localStorage.setItem("search_index_payload", JSON.stringify(cachedPayload));

    let resolveFetch!: (value: Response) => void;
    global.fetch = vi.fn(
      () =>
        new Promise<Response>((resolve) => {
          resolveFetch = resolve;
        })
    ) as typeof fetch;

    setCallbacks(
      () => {},
      () => {},
      () => {}
    );

    await initSearchIndex();
    expect(getAllData()).toEqual(cachedPayload.results);

    resolveFetch({
      ok: true,
      json: async () => freshPayload,
    } as Response);

    await vi.runAllTimersAsync();

    expect(getAllData()).toEqual(freshPayload.results);
    expect(JSON.parse(localStorage.getItem("search_index_payload") ?? "null")).toEqual(
      freshPayload
    );
  });

  it("searches post content as part of the custom index", async () => {
    const payload = createPayload("signature", [
      createResult({
        id: "spring-guide",
        title: "Guide",
        description: "Search documentation",
        content: "Learn how Spring Boot integrates with Astro tooling",
      }),
    ]);

    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => payload,
    }) as typeof fetch;

    let lastResults: SearchResult[] = [];
    setCallbacks(
      (results) => {
        lastResults = results;
      },
      () => {},
      () => {}
    );

    await initSearchIndex();
    search("spring");
    await vi.advanceTimersByTimeAsync(200);

    expect(lastResults.map((result) => result.id)).toContain("spring-guide");
  });
});
