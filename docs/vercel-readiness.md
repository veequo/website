# Vercel production readiness and verification

Status: planned, not configured or verified. Hosting target: Vercel, mandatory. Framework: Next.js provisional.

## Build and routing
At implementation time choose mutually supported stable framework/React versions and a Node.js LTS major supported by both Next.js and Vercel. Record the runtime in package configuration and Vercel settings, commit a lockfile, and use reproducible installs. Proposed scripts: dev, build (next build), start (next start), explicit lint, typecheck and browser tests. Use Vercel's Next.js preset and managed output; no static export or custom output override by default. Add vercel.json only for an actual requirement.

Use the approved sitemap in requirements.md. Validate direct links, refreshes, 404s and redirects. Choose static rendering or server execution per route. Add canonical URLs using the confirmed production domain, metadata, sitemap and robots policy. Prevent Preview indexing and verify the actual deployed headers/robots behavior. Treat secret-bearing integration modules as server-only.

## Environment plan
Create .env.example and ignore local secret files only when implementation is authorized. Document each actual variable's purpose, required environment, public/server scope and build/runtime behavior. No service secrets or domain values exist yet.

| Candidate | Scope | Condition |
| --- | --- | --- |
| SITE_URL | Server/build configuration, public value | Confirm production canonical domain; use an intentional preview-origin policy |
| Booking URL | Public configuration or content | Select booking service first; need not be an environment variable |
| Enquiry provider credential and recipient | Server-only secrets/config | Select delivery provider and recipient first |
| Analytics identifier | Deliberately public, optional | Only if analytics and data practices are approved |

Use separate Development, Preview and Production values with sandbox destinations for Preview enquiries. Never expose secrets through NEXT_PUBLIC_. Next.js public environment values are embedded at build time; changes require a new build. Validate required values before using them and fail clearly when required configuration is missing. Store real credentials in Vercel environment settings, not source control or documentation. Do not override NODE_ENV to distinguish Preview from Production.

## Asset and runtime plan
Use next/image where appropriate with accurate sizes, dimensions and tightly scoped remote image sources; optimize source assets and lazy-load below-fold media. Prioritize only genuinely critical imagery. Use next/font or optimized local fonts with restrained weights and suitable fallbacks. Preserve layout space and load heavy media on demand. Keep animations and interactive JavaScript proportionate to page needs. Set integration timeouts, validate form submissions server-side and handle abuse and provider errors if a first-party endpoint is approved. Do not rely on persistent local filesystem storage in server functions.

## Release gates (pending implementation)
- Clean reproducible installation, explicit lint and type checks, then a successful production build; preserve errors rather than bypassing them.
- Run the production server and exercise all published routes, direct refreshes, metadata, canonical URLs, links, 404s and missing integration configuration.
- Playwright journeys in Chromium, Firefox and WebKit at representative phone, tablet and desktop sizes. Device emulation does not replace a real mobile Safari check when available.
- Verify both audience CTA paths, navigation, FAQ controls and contact validation. Test successful, failed and repeated submissions using test destinations; verify service selection if approved.
- Review keyboard order, visible focus, reduced motion, screen-reader labels, contrast, touch controls, zoom/reflow and horizontal overflow. Supplement automated accessibility checks with manual review.
- Profile production loading and interaction; inspect layout shifts, long tasks and animation frames. Use Lighthouse as diagnostic evidence, not proof of all accessibility or performance. Aim for good Core Web Vitals: LCP <=2.5s, INP <=200ms, CLS <=0.1; real-user percentile compliance can only be assessed after sufficient field data.
- Verify Vercel Preview routes, integration environments, media, console/network errors, function/build logs and indexing restrictions before Production. Preview checks must not send real customer messages.
- Publish only confirmed contact details, prices and reviewed policies; omit unresolved testimonials and label illustrative work. Review any legally required address disclosure separately from marketing copy.

## Deployment and recovery (not authorized yet)
Select the Vercel team/project, Git provider, production branch and custom domain explicitly. Configure Preview and Production settings, deploy a reviewed commit to Preview, complete acceptance, then release the approved version to Production. Verify HTTPS, domain redirects, forms and public metadata after release. Retain the previous known-good deployment and verify rollback compatibility with any external schema/config changes. Record owners for errors, enquiry delivery and ongoing maintenance. Never mark readiness checks complete before evidence exists.

## Official references
- https://vercel.com/docs/deployments/environments
- https://vercel.com/docs/environment-variables
- https://nextjs.org/docs/app/guides/production-checklist
- https://nextjs.org/docs/pages/guides/environment-variables

Recheck current supported runtime/framework versions and provider instructions when implementation begins.
