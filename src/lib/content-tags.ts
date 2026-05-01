import { getAllBlogTagsWithCount } from "@/lib/blog";
import { getAllProjectTagsWithCount } from "@/lib/projects";
import { normalizeTagCounts } from "@/lib/tags";

export type TagCounts = {
  slug: string;
  label: string;
  blogCount: number;
  projectCount: number;
  totalCount: number;
};

export async function getAllContentTagCounts(): Promise<TagCounts[]> {
  const blogTags = normalizeTagCounts(await getAllBlogTagsWithCount());
  const projectTags = normalizeTagCounts(await getAllProjectTagsWithCount());
  const tagMap = new Map<string, TagCounts>();

  for (const { slug, label, count } of blogTags) {
    tagMap.set(slug, {
      slug,
      label,
      blogCount: count,
      projectCount: 0,
      totalCount: count,
    });
  }

  for (const { slug, label, count } of projectTags) {
    const existing = tagMap.get(slug);
    if (existing) {
      existing.projectCount = count;
      existing.totalCount = existing.blogCount + count;
      continue;
    }

    tagMap.set(slug, {
      slug,
      label,
      blogCount: 0,
      projectCount: count,
      totalCount: count,
    });
  }

  return Array.from(tagMap.values()).sort((a, b) => a.label.localeCompare(b.label));
}
