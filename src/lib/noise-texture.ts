/**
 * Generate an SVG noise/grain texture as a CSS data URI.
 * Applied at the root level for the Swiss design grain texture.
 */
export function generateNoiseSvgDataUri(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
    <filter id="noise">
      <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
    </filter>
    <rect width="100%" height="100%" filter="url(#noise)" opacity="0.03"/>
  </svg>`;

  const encoded = svg.replace(/\n/g, "").replace(/"/g, "'").replace(/#/g, "%23");

  return `url(data:image/svg+xml,${encoded})`;
}
