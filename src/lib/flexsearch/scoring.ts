import type { SearchResult } from "@/lib/search/types";

export function calculateRelevanceScore(result: SearchResult, queryLower: string): number {
  let score = 0;
  const titleLower = result.title.toLowerCase();
  const descLower = result.description.toLowerCase();
  const tagsLower = result.tags.join(" ").toLowerCase();
  const contentLower = result.content.toLowerCase();
  const queryWords = queryLower.split(/\s+/).filter(Boolean);

  if (titleLower === queryLower) {
    score += 1000;
  } else if (titleLower.startsWith(queryLower)) {
    score += 500;
  } else if (titleLower.includes(queryLower)) {
    score += 300;
  }

  for (const queryWord of queryWords) {
    if (titleLower.includes(queryWord)) score += 40;
    if (descLower.includes(queryWord)) score += 20;
    if (tagsLower.includes(queryWord)) score += 35;
    if (contentLower.includes(queryWord)) score += 10;
  }

  if (descLower.includes(queryLower)) score += 120;
  if (tagsLower.includes(queryLower)) score += 160;
  if (contentLower.includes(queryLower)) score += 80;

  try {
    const postDate = new Date(result.date);
    const now = new Date();
    const daysSince = (now.getTime() - postDate.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSince < 30) score += 5;
    else if (daysSince < 90) score += 2;
  } catch {
    // Ignore date errors
  }

  return score;
}
