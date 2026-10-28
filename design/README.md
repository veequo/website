# Veqo design review

28 October 2026. Design stage only. Phase A foundation is ready for review; it is not approved final artwork.

## Current authority

`approved-design-specification.md` is an exact copy of the user-supplied approved specification. It supersedes the older “direction not selected” statements in `../docs/visual-identity.md` and `../docs/requirements.md`. The five preparation documents remain unchanged as historical preparation records. Their factual business constraints and mandatory Vercel hosting still apply. The current specification's Bengaluru spelling takes precedence over earlier Bangalore enquiry choices; final public copy remains subject to review.

No application, dependency installation, package manifest, server, external publication, or deployment was created. Next.js/TypeScript remains provisional. Vercel remains mandatory for the eventual website; Preview review and explicit Production approval remain required.

## Review the foundation

1. [Identity and logo variants](phase-a/boards/01-identity.png): original custom path lettering, forward-reaching q tail, primary/reversed/single-color mark and symbol studies.
2. [Color and typography](phase-a/boards/02-type-color.png): specified typefaces, palette and hierarchy.
3. [Illustration and states](phase-a/boards/03-illustration-states.png): original vector composition, shape language and static button-state specimens.

Each PNG has an editable SVG beside it. Embedded fonts make SVG review independent of local font installation. The wordmark paths are original proposals; production exports, optical refinement and 16 px favicon checks follow approval. The illustration's interface is conceptual, not a real client product. No generated raster imagery or stock assets were used.

Review decisions: retain or revise the wordmark/q tail; retain or revise the typography and palette balance; retain or revise the illustration language and surface treatment.

The specification says: “Review gate: Approve the design foundation before expanding page designs.” Accordingly, desktop/mobile homepage compositions, mobile-menu layouts, page templates and full responsive reviews have not been expanded in this phase. Approval of Phase A authorizes the next design stage only. Website implementation, dependency installation and deployment require explicit authorization separately.

## Foundation proposal

All nine palette tokens are retained without hex changes: cream #FFF8ED, aubergine #56316D, coral #F17C67, yellow #F3C64D, ink #271D32, soft-peach #FFE9D9, muted-text #625867, surface #FFFFFF, border #E5D9D0. Cream dominates; aubergine structures; coral/yellow accent. White is used for selected art and useful surfaces, not a repetitive card grid.

Bricolage Grotesque 650 display, 600 section headings; DM Sans 400 body and 600 controls. Desktop display target 72/76 px, mobile 44/48; section 40/46 desktop and 32/38 mobile; body 18/28; supporting 16/24; labels 14/20. Board display specimen is 78 px. These are visual targets, not implemented responsive styles. Optional IBM Plex Mono is deferred; no additional typeface is needed for this foundation. Proposed fallbacks: display system-ui/sans-serif, body Arial/sans-serif; font loading, subset size, fallback metrics and layout shift require implementation-stage verification.

Space steps: 4, 8, 12, 16, 24, 32, 48, 64, 96 px. Proposed content maximum 1280 px; desktop gutters 64 px, tablet 32 px, mobile 24 px. Use asymmetric editorial columns in later page compositions. Large surfaces 24 px radius, smaller panels 16 px, controls 10–12 px; 1 px decorative dividers. The 8 px hard art shadow supports the illustration's tactile character; interface surfaces stay flat unless elevation has a purpose.

Illustration uses organic peach fields, deliberate geometry, a consistent 3 px outline at its 1× art scale and an abstract hand carrying a small product interface. The connecting line expresses progress. Meaningful illustration description proposed: “A question follows a curved path into a digital product, supported by a hand and a completion check.” Use empty alt if surrounding copy already conveys the same meaning. On mobile simplify secondary shapes and preserve text/CTA independence; do not scale the whole desktop page down.

## Contrast and access

`phase-a/contrast-check.json` records computed WCAG sRGB ratios. Ink/cream 15.21:1; aubergine/cream 9.68:1; muted-text/cream 6.40:1. These meet normal-text AA contrast. Cream/aubergine buttons pass. Ink on coral 5.98:1 and on yellow 9.94:1 pass. Coral/cream 2.55:1 and yellow/cream 1.53:1 fail even 3:1: never use them alone for essential text, control outlines or status indicators. Border/cream 1.31:1 is decorative only; use aubergine for meaningful form/control boundaries. This is color-pair validation, not a claim of whole-site WCAG compliance.

Proposed controls: minimum 48 px tall, clear text labels; 3 px aubergine keyboard ring separated by a 3 px cream gap. On dark sections use a cream ring with an aubergine gap. Visible focus must survive wrapping, zoom and clipping. Textual/error icons accompany status colors. Student and business actions must have distinct explicit labels in Phase B; the board shows one action only to compare its states.

## Motion proposal for later prototypes

| Purpose / trigger | Normal behavior | Interruption | Reduced motion |
| --- | --- | --- | --- |
| Button hover / pointer enter | Color transition 140 ms; optional 1 px upward move | Reverse from current value on exit | Instant color; no movement |
| Press / pointer or keyboard activation | Return to resting position; ink fill, 90 ms | Release restores current focus/hover state | Instant fill |
| Focus / keyboard navigation | Ring appears immediately | Clear only when focus leaves | Same immediate ring |
| First view / optional page reveal | 240 ms opacity and up to 8 px transform; 50 ms stagger, at most 3 groups | Cancel on route change; content visible without scripts | All content visible immediately |
| Hero / first view only | Single 320 ms layer settlement; no looping | Skip if offscreen or reduced-motion changes | Static composition |
| Mobile menu / explicit toggle | 180 ms disclosure | Rapid toggle reverses; Escape closes and restores trigger focus | Immediate disclosure |
| Process / actual progression | Position-based marker; no simulated completion | Reflect current position, never lock scroll | Static numbered sequence |

Easing proposal: cubic-bezier(0.2, 0.8, 0.2, 1). No animation library selected. Static state artwork cannot verify keyboard behavior, timing, screen-reader semantics, responsive reflow or reduced-motion preference changes. Those require the later interactive design/implementation gates.

## Verification and remaining decisions

All three boards were rendered at 1600×1100 using existing bundled Playwright and installed headless Chrome, with both embedded font families confirmed loaded. All rendered PNGs were visually inspected; an overlapping caption on board 1 was corrected and re-rendered. Ten palette pairings were computed. No website tests/build/browser journey checks have been claimed.

Open: foundation approval, final logo/vector exports, font loading strategy, final hero artwork, homepage and templates, mobile/tablet compositions, real work and permissions, packages/pricing/timelines, booking/enquiry destination, uploads, verified team claims and legal content. No unresolved business facts were invented.

## Assets and reproducibility

Original wordmark and illustration: authored for this Veqo review in `phase-a/source/build_boards.py` (Python standard library only). Run with an existing Python interpreter to regenerate SVG boards and contrast calculations; no dependencies to install. PNGs are review exports, not production assets.

Font files were downloaded as design assets, not installed on the machine. Both come with their respective OFL license files in `phase-a/assets/`. Sources: [Bricolage Grotesque, Google Fonts repository](https://github.com/google/fonts/tree/main/ofl/bricolagegrotesque), [DM Sans, Google Fonts repository](https://github.com/google/fonts/tree/main/ofl/dmsans). Upstream downloads used main on 28 October 2026; the retained local files determine these review renders. See `phase-a/assets/SHA256SUMS.txt` for exact file hashes. Redistribution must retain the supplied licenses. Final web subsets and loading behavior have not been prepared.
