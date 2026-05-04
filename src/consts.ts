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

  // About Page Content
  aboutNarrative:
    "Backend development suits me because the work lives in systems: how things connect, where load accumulates, what breaks in production that never showed in testing. Java and Spring Boot are the daily tools. The actual job is building things that hold up. I've been doing this professionally since 2024, mostly on backend services.\n\nThis site is where I write through problems. Notes on things I've built, things I've read, the occasional opinion. Writing is how I figure out what I actually think. If you find something useful here, good.",

  // Work Experience (extensible timeline)
  workExperience: [
    {
      company: "UST",
      role: "Software Engineer",
      period: "2024\u2013Present",
      description: "Building and maintaining backend services with Java and Spring Boot.",
    },
  ],

  // Interests (for tag pills on about page)
  interests: ["Gaming", "Anime", "Reading", "Movies & TV"],
} as const;
