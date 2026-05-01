function stripCodeFenceMarkers(content: string): string {
  return content.replace(/```[\w-]*\n?/g, "\n");
}

function stripInlineFormatting(content: string): string {
  return content
    .replace(/!\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/^\s{0,3}(#{1,6}|>+)\s*/gm, "")
    .replace(/^\s*([-*+] |\d+\. )/gm, "")
    .replace(/[~*_]/g, " ");
}

function stripMdxSyntax(content: string): string {
  return content
    .replace(/^\s*(import|export)\s.+$/gm, " ")
    .replace(/<\/?[A-Z][^>]*>/g, " ")
    .replace(/<[^>]+>/g, " ");
}

export function toSearchableText(content: string, maxLength: number = 5000): string {
  if (!content) return "";

  const normalized = stripMdxSyntax(stripInlineFormatting(stripCodeFenceMarkers(content)))
    .replace(/&[a-z]+;/gi, " ")
    .replace(/\|/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return normalized.slice(0, maxLength);
}
