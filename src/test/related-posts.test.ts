import { describe, expect, it } from "vitest";
import { calculateReadingTime, formatBlogDate, formatReadingTime } from "@/lib/utils";

describe("RelatedPosts meta computation", () => {
  it("formats the same meta string as BlogCard would", () => {
    const publishDate = new Date("2025-01-15");
    const body = "A ".repeat(500); // ~250 words

    const formattedDate = formatBlogDate(publishDate);
    const readingTime = calculateReadingTime(body);
    const meta = `${formattedDate} · ${formatReadingTime(readingTime)}`;

    expect(meta).toContain("·");
    expect(meta).toContain("min read");
    expect(formattedDate).toBeTruthy();
  });
});
