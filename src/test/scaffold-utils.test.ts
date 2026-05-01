import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { describe, expect, it } from "vitest";

import {
  renderBlogTemplate,
  renderProjectTemplate,
  replaceTemplateToken,
  slugify,
} from "../../.scripts/scaffold-utils.js";

function readRootFile(...segments: string[]) {
  return readFile(join(process.cwd(), ...segments), "utf8");
}

describe("content scaffolding", () => {
  it("replaces both compact and spaced template tokens", () => {
    const compact = replaceTemplateToken("publishDate: {{DATE}}", "DATE", "2026-05-01");
    const spaced = replaceTemplateToken("publishDate: {{ DATE }}", "DATE", "2026-05-01");

    expect(compact).toBe("publishDate: 2026-05-01");
    expect(spaced).toBe("publishDate: 2026-05-01");
  });

  it("renders the shipped blog template without leaving unresolved tokens", async () => {
    const template = await readRootFile(".templates", "blog-post.md");

    const rendered = renderBlogTemplate(template, {
      title: "Hello Astro",
      description: "A valid generated post",
      date: "2026-05-01",
    });

    expect(rendered).toContain('title: "Hello Astro"');
    expect(rendered).toContain('description: "A valid generated post"');
    expect(rendered).toContain("publishDate: 2026-05-01");
    expect(rendered).not.toMatch(/\{\{\s*[A-Z_]+\s*\}\}/);
  });

  it("renders the shipped project template without placeholder URLs when omitted", async () => {
    const template = await readRootFile(".templates", "project.md");

    const rendered = renderProjectTemplate(template, {
      title: "Portfolio",
      description: "Personal site",
      date: "2026-05-01",
      githubUrl: "",
      demoUrl: "",
    });

    expect(rendered).toContain('title: "Portfolio"');
    expect(rendered).toContain("date: 2026-05-01");
    expect(rendered).not.toContain("{{GITHUB_URL}}");
    expect(rendered).not.toContain("{{DEMO_URL}}");
    expect(rendered).not.toContain("**Repository**");
    expect(rendered).not.toContain("**Live Demo**");
  });

  it("creates stable slugs for generated content files", () => {
    expect(slugify("Hello, Astro World!")).toBe("hello-astro-world");
    expect(slugify("  Repeated   Spaces  ")).toBe("repeated-spaces");
  });
});
