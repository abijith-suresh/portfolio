import type { ThemeDefinition } from "./types";

const inkAndPaper: ThemeDefinition = {
  name: "ink-and-paper",
  displayName: "Ink & Clay",

  // Light theme: Unbleached Paper
  // Warm off-white canvas, clay-tinted near-black text, warm stone muted.
  light: {
    background: "oklch(97.5% 0.007 80)",
    foreground: "oklch(17% 0.014 50)",

    card: "oklch(95% 0.010 80)",
    cardForeground: "oklch(17% 0.014 50)",

    popover: "oklch(92% 0.013 78)",
    popoverForeground: "oklch(17% 0.014 50)",

    primary: "oklch(17% 0.014 50)",
    primaryForeground: "oklch(97.5% 0.007 80)",

    secondary: "oklch(95% 0.010 80)",
    secondaryForeground: "oklch(17% 0.014 50)",

    muted: "oklch(95% 0.010 80)",
    mutedForeground: "oklch(54% 0.012 65)",

    accent: "oklch(92% 0.013 78)",
    accentForeground: "oklch(17% 0.014 50)",

    destructive: "oklch(45% 0.22 18)",
    destructiveForeground: "oklch(97.5% 0.007 80)",

    border: "oklch(88% 0.015 74)",
    input: "oklch(88% 0.015 74)",
    ring: "oklch(47% 0.09 155)",
  },

  // Dark theme: Workshop at Night
  // Warm amber-shifted dark (not cool midnight), clay accent glows brighter.
  dark: {
    background: "oklch(13.5% 0.016 50)",
    foreground: "oklch(93% 0.010 75)",

    card: "oklch(18% 0.018 50)",
    cardForeground: "oklch(93% 0.010 75)",

    popover: "oklch(22% 0.018 50)",
    popoverForeground: "oklch(93% 0.010 75)",

    primary: "oklch(93% 0.010 75)",
    primaryForeground: "oklch(13.5% 0.016 50)",

    secondary: "oklch(18% 0.018 50)",
    secondaryForeground: "oklch(93% 0.010 75)",

    muted: "oklch(22% 0.018 50)",
    mutedForeground: "oklch(58% 0.014 62)",

    accent: "oklch(18% 0.018 50)",
    accentForeground: "oklch(93% 0.010 75)",

    destructive: "oklch(63% 0.22 20)",
    destructiveForeground: "oklch(13.5% 0.016 50)",

    border: "oklch(28% 0.020 50)",
    input: "oklch(28% 0.020 50)",
    ring: "oklch(69% 0.09 155)",
  },
};

export default inkAndPaper;
