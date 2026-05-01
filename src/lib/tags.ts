export type TagCountInput = {
  tag: string;
  count: number;
};

export type NormalizedTagCount = {
  slug: string;
  label: string;
  count: number;
};

function pickPreferredLabel(currentLabel: string, candidateLabel: string): string {
  return currentLabel.localeCompare(candidateLabel, undefined, { sensitivity: "base" }) <= 0
    ? currentLabel
    : candidateLabel;
}

export function slugifyTag(tag: string): string {
  return tag
    .trim()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^\p{Letter}\p{Number}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

export function getTagHref(tag: string): string {
  return `/tags/${slugifyTag(tag)}`;
}

export function normalizeTagCounts(entries: TagCountInput[]): NormalizedTagCount[] {
  const tagMap = new Map<string, NormalizedTagCount>();

  for (const entry of entries) {
    const label = entry.tag.trim();
    const slug = slugifyTag(label);
    const existing = tagMap.get(slug);

    if (existing) {
      existing.count += entry.count;
      existing.label = pickPreferredLabel(existing.label, label);
      continue;
    }

    tagMap.set(slug, {
      slug,
      label,
      count: entry.count,
    });
  }

  return Array.from(tagMap.values()).sort((a, b) => a.label.localeCompare(b.label));
}
