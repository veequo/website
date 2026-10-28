# Veqo website

Next.js App Router, React, TypeScript, CSS Modules. The original preparation and Phase A design materials are preserved in `docs/` and `design/`.

## Run locally

Use Node.js 24 and pnpm 11.25.0:

```sh
corepack enable
corepack prepare pnpm@11.25.0 --activate
pnpm install --frozen-lockfile
pnpm dev
```

Open http://localhost:3000. For a production run: `pnpm build` then `pnpm start`. Checks: `pnpm typecheck` and `pnpm lint`.

## Content and release status

This is a working pre-launch website. Enquiries only generate downloadable, unsent drafts in the browser. There is no email endpoint, database, analytics, or booking integration. All routes intentionally have noindex metadata and robots blocks crawling until launch review. Do not remove these protections until final content and policies are approved.

Use Vercel's Next.js preset, Node.js 24.x, and the committed pnpm lockfile. No custom output directory or static export is needed. Preview deployment and Production release have not been performed.

See `docs/implementation-status.md` for decisions and release gates. The older preparation documents describe the historical design-only stage; the current user instruction authorizes this implementation.

## Asset provenance

The hero is extracted from the original Phase A SVG composition. The wordmark and favicon reuse its original path lettering. Portfolio miniatures are new illustrative CSS compositions, clearly labelled concepts. Local Bricolage Grotesque and DM Sans assets are loaded using next/font; original OFL licenses remain beside the source fonts. All original boards, font files, and generator source remain unchanged.
