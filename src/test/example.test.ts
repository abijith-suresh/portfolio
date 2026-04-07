import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

function readWorkspaceFile(...segments: string[]) {
  return readFile(join(process.cwd(), ...segments), "utf8");
}

describe("production readiness regressions", () => {
  it("keeps draft blog posts out of static paths", async () => {
    const pageSource = await readWorkspaceFile("src", "pages", "blog", "[...slug].astro");

    expect(pageSource).toMatch(/getCollection\("blog",\s*\(post\)\s*=>\s*!post\.data\.draft\s*\)/);
  });

  it("does not support blog updatedDate metadata", async () => {
    const configSource = await readWorkspaceFile("src", "content", "config.ts");
    const blogPageSource = await readWorkspaceFile("src", "pages", "blog", "[...slug].astro");
    const rssSource = await readWorkspaceFile("src", "pages", "rss.xml.js");

    expect(configSource).not.toMatch(/updatedDate/);
    expect(blogPageSource).not.toMatch(/updatedDate/);
    expect(rssSource).not.toMatch(/updatedDate/);
  });

  it("keeps search index and rss prerendered on Vercel", async () => {
    const searchSource = await readWorkspaceFile("src", "pages", "api", "search-index.json.ts");
    const rssSource = await readWorkspaceFile("src", "pages", "rss.xml.js");

    expect(searchSource).toContain("export const prerender = true;");
    expect(rssSource).toContain("export const prerender = true;");
  });

  it("does not emit invalid project article JSON-LD", async () => {
    const projectPageSource = await readWorkspaceFile("src", "pages", "projects", "[slug].astro");

    expect(projectPageSource).not.toMatch(/jsonLd\s*=/);
  });

  it("runs Astro-aware type checks locally", async () => {
    const packageJson = JSON.parse(await readWorkspaceFile("package.json")) as {
      scripts?: Record<string, string>;
    };

    expect(packageJson.scripts?.["type-check"]).toBe("astro check");
  });

  it("runs the shared quality gate in CI", async () => {
    const packageJson = JSON.parse(await readWorkspaceFile("package.json")) as {
      scripts?: Record<string, string>;
    };
    const ciSource = await readWorkspaceFile(".github", "workflows", "ci.yml");

    expect(packageJson.scripts?.verify).toBe(
      "bun run type-check && bun run lint && bun run format:check && bun run test && bun run build"
    );
    expect(ciSource).toContain("name: quality");
    expect(ciSource).toContain("run: bun run verify");
    expect(ciSource).toContain("uses: actions/dependency-review-action@v4");
    expect(ciSource).not.toContain("|| true");
  });
});
