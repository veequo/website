# Preparation and architecture plan

Status: preparation recorded; no application scaffold, project dependencies, or deployment. Vercel production compatibility is mandatory.

## Provisional architecture
Next.js App Router, TypeScript and CSS Modules remain provisional. Render content statically where possible; keep client components limited to actual interactions. No animation library is selected. Astro evaluation is justified only if the confirmed scope becomes a largely static content site with externally handled booking/enquiries and a meaningful benefit from its architecture. Do not switch without recording the requirement-based decision.

## Planned structure (not created)
```text
src/app/           Routes, shared layouts, metadata and error states
src/components/    UI, layout, forms and motion components
src/content/       Approved service, article and portfolio content
src/styles/        Design tokens and global styling
src/lib/           Environment validation and integrations
public/            Optimized images, fonts and icons
tests/e2e/         Critical browser journeys
docs/              Requirements, design and release decisions
```

## Skills
Personal reusable skills: custom-frontend-art-direction and motion-design. Each has SKILL.md plus agents/openai.yaml, automatic discovery enabled, no project dependency or external service requirement. Veqo facts remain in these documents. Follow the available Skill Creator instructions, validate frontmatter/naming/scaffold completion using quick_validate.py, and review metadata, scope and behavioral guidance manually. Structural validation does not prove implementation quality.

## Authorized sequence
1. Complete and validate skills and preparation documents.
2. Obtain visual identity and remaining functional decisions.
3. Obtain website implementation authorization before creating the application or installing dependencies.
4. Implement approved scope, verify a clean production build and browser behavior.
5. Obtain deployment authorization, connect/configure Vercel, verify Preview, then release the approved version to Production.

No backend, CMS, upload handling, newsletter or analytics integration is assumed. Select each only against an approved need. Optional form uploads require explicit format/size limits, secure storage, access, retention, and abuse handling decisions before implementation.

## Motion and responsive acceptance
Specify each effect's purpose, trigger, timing, interruption behavior and reduced-motion alternative. Prefer CSS and transform/opacity where suitable. Avoid scroll hijacking, hidden essential content and hover-only actions. Limit simultaneous effects, pause offscreen work and clean up observers/listeners. Review keyboard focus, screen-reader semantics, touch controls, zoom/reflow and long content. Profile actual production behavior rather than promising an unmeasured frame rate.
