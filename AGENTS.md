# Agent Instructions — abijith.sh

## Overview

- Personal portfolio and blog built with Astro.
- Most changes are in content collections, Astro components, and site presentation.

## Stack

- Astro 5
- TypeScript
- Tailwind CSS v4
- MDX
- Bun

## Commands

- Install deps: `bun install`
- Dev server: `bun run dev`
- Quality gate: `bun run verify`
- Individual steps: `bun run type-check`, `bun run lint`, `bun run format:check`, `bun run test`, `bun run build`

## Project Map

- `src/content/config.ts`: content collection schemas
- `src/content/blog/`: blog posts
- `src/content/projects/`: project entries
- `src/components/`: Astro components and MDX helpers
- `src/lib/`: blog, project, TOC, and utility helpers
- `.templates/` and `.scripts/`: content scaffolding utilities

## Hard Rules

- Use the `@/` path alias for `src` imports.
- Keep content frontmatter valid against `src/content/config.ts` schemas.
- Prefer existing Astro component and content patterns over new abstractions.
- If you change collection schemas, update affected content and validation paths together.

## Git And CI

- Branch from the latest `main` before starting changes.
- Never commit directly to `main`.
- Commit and PR titles must use Conventional Commits: `feat`, `fix`, `docs`, `refactor`, `chore`, `test`, `ci`.
- Before push, run `bun run verify`.
- `pre-commit` runs `lint-staged`, `commit-msg` runs `commitlint`, and `pre-push` runs `bun run verify`.
- CI enforces `quality` and `pr-title` checks on pull requests.
- Squash merge is the expected merge strategy.
