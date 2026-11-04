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

This is a working pre-launch website. Enquiries use Web3Forms once a public access key is configured for helloveqo@gmail.com. Configuration and inbox delivery verification are still required. There is no application database, analytics, or booking integration. All routes intentionally have noindex metadata and robots blocks crawling until launch review. Do not remove these protections until final content and policies are approved.

Use Vercel's Next.js preset, Node.js 24.x, and the committed pnpm lockfile. No custom output directory or static export is needed. Preview deployment and Production release have not been performed.

See `docs/implementation-status.md` for decisions and release gates. The older preparation documents describe the historical design-only stage; the current user instruction authorizes this implementation.

## Asset provenance

The hero is extracted from the original Phase A SVG composition. The wordmark and favicon reuse its original path lettering. Portfolio miniatures are new illustrative CSS compositions, clearly labelled concepts. Local Bricolage Grotesque and DM Sans assets are loaded using next/font; original OFL licenses remain beside the source fonts. All original boards, font files, and generator source remain unchanged.

## Contact form activation

1. Create a free Web3Forms form linked to helloveqo@gmail.com and copy its public access key.
2. Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY`. This is a public form identifier, not a Gmail password or private API credential.
3. Set the same variable in the deployment environment before building. Restart the local dev server or redeploy after changing it: Next.js embeds public environment variables at build time.
4. Submit a test from `/contact` and verify the message arrives in Gmail (including Spam), contains every field, and Reply targets the visitor. API success alone is not proof of inbox delivery.

Without a key, submission is disabled and visitors are directed to email. With a key, the form posts to `https://api.web3forms.com/submit` and shows pending, success, or error feedback. Failed requests preserve the fields; a 20-second timeout may leave delivery uncertain. Web3Forms server-side spam filtering and a honeypot are included; hCaptcha is not configured. The free plan accepts 250 submissions per month. Review the draft privacy policy before launch.
