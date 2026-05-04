// Site Configuration
export const SITE = {
  // Basic Info
  title: "Abijith S",
  description: "Personal portfolio and blog of Abijith S - developer, builder, writer.",
  author: "Abijith S",
  domain: "abijith.sh",
  url: "https://abijith.sh",
  locale: "en-US",

  // Hero Section
  greeting: "Hey, I'm Abijith",
  role: "Backend Engineer",
  heroIntro:
    "Based in Kochi, Kerala. I work on the backend, the part that keeps things running while everything else stays visible. Java and Spring Boot, mostly.",

  // Pagination
  postsPerPage: 10,
  projectsPerPage: 12,
} as const;

// Navigation
export const NAV_LINKS = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
] as const;

// Social Links
export const SOCIAL_LINKS = {
  github: "https://github.com/abijith-suresh",
  x: "https://x.com/abijith_sh",
  linkedin: "https://linkedin.com/in/abijith-suresh",
  bluesky: "https://bsky.app/profile/abijith.bsky.social",
} as const;

// Author Information
export const AUTHOR = {
  name: "Abijith S",
  fullName: "Abijith Suresh",
  tagline: "Backend engineer at UST. Kochi, Kerala.",
  avatar: "/avatar.jpg",
  twitterHandle: "@abijith_sh", // Kept for SEO compatibility (twitter:creator metadata)

  // About Page — three narrative sections
  aboutWhatIDo:
    "I work as a software engineer at UST, based in Kochi. Most of the work is backend: Java, Spring Boot, services that sit between data and the rest of the system. The actual job is reliability: thinking through failure modes, handling load, accounting for cases that don't show up in the happy path. I've been working on this since 2024.",

  aboutHowIGotHere:
    "The path was mostly curiosity. Tried things, broke them, worked out why. Java and Spring Boot came through professional work; Python, TypeScript, and enough React to trace a problem from the database to the browser came from not wanting to stop at a service boundary. Backend is where I've settled because the problems there are the ones I keep thinking about.",

  aboutThisSite:
    "Writing is how I understand what I actually think about something. This site is where that ends up: notes after shipping things, thoughts after reading, the occasional opinion. No particular theme except that it's mine.",

  // Interests (for tag pills on about page)
  interests: ["Gaming", "Anime", "Reading", "Movies & TV"],
} as const;
