# Repository Guidelines

## Project Structure & Module Organization
This repository now contains an Astro-based static blog plus the generated GitHub Pages output at the repository root. Source code lives in `src/`: pages in `src/pages/`, shared layouts in `src/layouts/`, reusable UI in `src/components/`, helpers in `src/lib/`, and global styles in `src/styles/`. Migrated posts are Markdown files in `src/content/posts/` and retain their original URL paths through frontmatter. Migration and publish helpers live in `scripts/`. Existing static media remains under `images/`, with generated public output copied into root paths such as `2019/`, `2020/`, `archives/`, and `tags/`.

## Build, Test, and Development Commands
- `npm install`: install Astro and migration dependencies.
- `npm run dev`: start the local Astro development server.
- `npm run build`: generate the static site into `dist/`.
- `npm run preview`: preview the built `dist/` output.
- `npm run migrate`: re-extract posts from the legacy generated HTML into `src/content/posts/`.
- `npm run publish:root`: build and copy `dist/` to the repository root for GitHub Pages branch-root publishing.

## Coding Style & Naming Conventions
Use two-space indentation for Astro, TypeScript, JavaScript, CSS, and Markdown frontmatter. Keep component names in PascalCase, such as `PostList.astro`, and helper modules in lower-case camel or noun names, such as `posts.ts`. Preserve legacy article paths in the `legacyPath` frontmatter so old links keep working. Avoid editing generated root output directly; change `src/` or `scripts/`, then rebuild and publish.

## Testing Guidelines
There is no unit test suite. Treat `npm run build` as the required validation step. After publishing to root, run a local static server such as `python3 -m http.server 8000` and check the home page, a recent post, an older post with images, `/archives/`, `/tags/`, and `/rss.xml`. Verify browser console output when making layout or script changes.

## Commit & Pull Request Guidelines
Historical commits used generated messages like `Site updated: 2020-05-07 18:48:21`. For source changes, prefer clear subjects such as `Migrate blog to Astro` or `Fix archive page layout`.

Pull requests should describe source changes, note whether generated root output was refreshed with `npm run publish:root`, and include screenshots for visual changes. Link related issues when available and list local build or preview checks performed.

## Agent-Specific Instructions
Before editing migrated posts, confirm whether the change belongs in Markdown source or generated root output. Do not delete legacy content, media, or URL paths unless explicitly requested.
