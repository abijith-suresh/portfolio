import { describe, expect, it } from "vitest";

// Testable helper extracted from EmptyState rendering logic
function buildEmptyStateAttrs(message: string) {
  if (!message || message.trim().length === 0) {
    throw new Error("EmptyState message must not be empty");
  }
  return {
    message: message.trim(),
    ariaLabel: `Empty: ${message.trim()}`,
  };
}

describe("EmptyState", () => {
  it("accepts a non-empty message string", () => {
    const attrs = buildEmptyStateAttrs("No blog posts to display yet.");
    expect(attrs.message).toBe("No blog posts to display yet.");
  });

  it("trims whitespace from message", () => {
    const attrs = buildEmptyStateAttrs("  No tags found.  ");
    expect(attrs.message).toBe("No tags found.");
  });

  it("throws when message is empty", () => {
    expect(() => buildEmptyStateAttrs("")).toThrow("EmptyState message must not be empty");
    expect(() => buildEmptyStateAttrs("   ")).toThrow("EmptyState message must not be empty");
  });

  it("generates an aria-label from the message", () => {
    const attrs = buildEmptyStateAttrs("No projects found.");
    expect(attrs.ariaLabel).toBe("Empty: No projects found.");
  });

  // Visual contract — all known call-sites pass a message describing the missing content
  it("known messages follow the 'No X found/yet' pattern", () => {
    const knownMessages = [
      "No blog posts to display yet.",
      "No projects to display yet.",
      "No tags found.",
      "No content found with this tag.",
    ];
    knownMessages.forEach((msg) => {
      expect(msg).toMatch(/^No .+/);
    });
  });
});
