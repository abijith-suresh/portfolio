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

  it("supports optional blog updatedDate metadata", async () => {
    const configSource = await readWorkspaceFile("src", "content", "config.ts");

    expect(configSource).toMatch(/updatedDate:\s*z\.coerce\.date\(\)\.optional\(\)/);
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

  it("fails CI on type errors and includes tests", async () => {
    const ciSource = await readWorkspaceFile(".github", "workflows", "ci.yml");

    expect(ciSource).toContain("run: bun run type-check");
    expect(ciSource).not.toContain("|| true");
    expect(ciSource).toContain("run: bun run test");
  });
});
