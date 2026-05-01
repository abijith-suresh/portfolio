import { describe, expect, it } from "vitest";

import { toSearchableText } from "@/lib/search/text";

describe("toSearchableText", () => {
  it("strips markdown and MDX syntax while preserving readable text", () => {
    const content = `import Callout from "@/components/mdx/Callout.astro";

## Hello **Astro**

Read the [docs](https://docs.astro.build).

<Callout variant="tip">Keep building.</Callout>

\`inline code\`

- item one
- item two
`;

    expect(toSearchableText(content)).toBe(
      "Hello Astro Read the docs. Keep building. inline code item one item two"
    );
  });

  it("truncates long content to the requested limit", () => {
    expect(toSearchableText("abcdef", 4)).toBe("abcd");
  });
});
