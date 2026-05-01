export interface SearchResult {
  id: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  url: string;
  content: string;
  type: "blog" | "project";
}

export interface SearchIndexPayload {
  generatedAt: string;
  signature: string;
  results: SearchResult[];
}
