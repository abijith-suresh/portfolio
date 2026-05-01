# Changelog

All notable changes to this site are documented in this file.

This changelog follows the categories and intent of [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), but tracks the site as a series of dated milestones instead of package releases.

## Unreleased

### Changed

- Removed release automation, Git tags, and release-oriented package metadata from the repository.
- Reframed project history as a manual site changelog instead of GitHub release notes.

## 2026-03-24 — Vercel migration

### Changed

- Migrated deployment from GitHub Pages to Vercel for the `abijith.sh` custom domain.
- Renamed the repository to `abijith.sh` and aligned canonical site references around that identity.

### Fixed

- Prevented draft blog posts from being generated as public pages.
- Restored Astro-aware type checking in CI and added regression coverage for launch readiness.

## 2026-02-14 — Ink and Paper refresh

### Added

- Portfolio redesign with the Ink and Paper theme, editorial styling, a custom color palette, and Satoshi typography.
- Font Awesome integration, dynamic OG image generation, content templates, and real starter content for the Astro-era site.

### Changed

- Redesigned the About page around a more personal centered layout and refined the site's branded visual language.

## 2026-02-01 — Search and content organization

### Added

- FlexSearch-powered search, year-based content organization, dual licensing, and refreshed DevContainer support.

### Changed

- Replaced Pagefind, simplified the theme system, and improved shared content and search architecture.

## 2026-01-28 — Discovery and navigation improvements

### Added

- Reading progress, related posts, tag discovery pages, richer search modal interactions, and broader navigation and metadata polish.

### Changed

- Refined the post and project browsing experience with better motion, card layouts, and semantic content patterns.

### Fixed

- Closed multiple navigation, modal, tag-casing, sitemap, and CI/type-safety issues across the publishing experience.

## 2026-01-26 — Publishing foundations

### Added

- Publishing foundations for the Astro rewrite: RSS, sitemap and robots support, structured SEO, MDX and Expressive Code support, TOC and custom MDX components, CI, and pre-commit automation.

### Changed

- Evolved the initial rewrite into a more complete blog and portfolio platform with smoother transitions and a more maintainable content architecture.

## 2026-01-16 — Astro rewrite foundation

### Added

- Initial migration from Next.js to Astro with Bun.
- Content collections with Zod validation, responsive layout primitives, dynamic project and blog pages, an About page, a theme toggle, and View Transitions.
- Shadcn-style component integration and the first site configuration structure for navigation and social links.

### Changed

- Reorganized the early Astro codebase to make page-specific components and content easier to manage.
