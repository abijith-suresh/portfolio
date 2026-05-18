import { describe, expect, it } from "vitest";
import { generateNoiseSvgDataUri } from "@/lib/noise-texture";

describe("generateNoiseSvgDataUri", () => {
  it("returns a data URI string", () => {
    const result = generateNoiseSvgDataUri();
    expect(result).toMatch(/^url\(data:image\/svg\+xml/);
  });

  it("contains an SVG with feTurbulence", () => {
    const result = generateNoiseSvgDataUri();
    expect(result).toContain("feTurbulence");
  });

  it("uses low opacity for subtlety", () => {
    const result = generateNoiseSvgDataUri();
    expect(result).toContain("opacity");
  });
});
