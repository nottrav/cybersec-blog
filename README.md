# Travis McGhee — Cybersecurity Blog

Personal blog and project portfolio focused on digital privacy, scam awareness, and safer online habits.

**Live site:** [travismcghee.space](https://travismcghee.space)

## Stack

- [Astro](https://astro.build) — static site generator
- [Tailwind CSS](https://tailwindcss.com) — styling
- TypeScript
- Markdown / MDX for content

## Local Development

```bash
pnpm install
pnpm dev
```

Site runs at `http://localhost:4321`.

## Commands

| Command             | Action                            |
| :------------------ | :-------------------------------- |
| `pnpm dev`          | Start local dev server            |
| `pnpm dev:network`  | Start dev server on local network |
| `pnpm build`        | Run checks and build for production |
| `pnpm preview`      | Preview production build          |
| `pnpm lint`         | Run ESLint                        |
| `pnpm lint:fix`     | Auto-fix lint issues              |

## Project Structure

- `src/content/blog/` — blog posts (Markdown/MDX)
- `src/content/projects/` — project entries
- `src/components/` — Astro components
- `src/pages/` — routes
- `src/consts.ts` — site-wide constants
- `public/` — static assets (images, PDFs, fonts)

## Credits

Built on the [Astro Nano](https://github.com/markhorn-dev/astro-nano) starter theme.
