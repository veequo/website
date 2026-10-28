# Veqo — Visual Design Specification & Prototype Plan

**Status:** Visual direction approved · Design stage  
**Brand direction:** Ideas in Full Color  
**Implementation status:** Not started  
**Deployment requirement:** Vercel

## 1. Design vision

Veqo is a creative technology studio that helps students develop meaningful projects and helps businesses turn ideas into digital products.

The website should combine:
- Expressive editorial design.
- Warm, human illustration.
- Clear technical communication.
- Purposeful animation.
- Strong separation between student services and business services.

**Design principle:** Playful in expression, precise in execution.

Avoid generic AI gradients, stock-dashboard layouts, excessive glassmorphism, decorative code snippets, and repetitive card grids.

## 2. Color system

Proposed tokens; verify contrast before final approval.

| Token | Hex | Primary use |
|---|---|---|
| `cream` | `#FFF8ED` | Main page background |
| `aubergine` | `#56316D` | Primary brand, headings, buttons |
| `coral` | `#F17C67` | Highlights, secondary actions |
| `yellow` | `#F3C64D` | Small emphasis and illustration details |
| `ink` | `#271D32` | Body text and dark surfaces |
| `soft-peach` | `#FFE9D9` | Soft panels and illustration layers |
| `muted-text` | `#625867` | Supporting text, subject to contrast checks |
| `surface` | `#FFFFFF` | Forms and elevated content where useful |
| `border` | `#E5D9D0` | Dividers and component boundaries |

### Color rules
- Cream is the dominant canvas.
- Aubergine establishes structure and trust.
- Coral draws attention to selected actions and important details.
- Yellow is an accent, not a paragraph background.
- Reserve saturated colors for intentional moments.
- Never communicate status through color alone.
- Do not use yellow or coral for small text on cream without verifying contrast.

## 3. Typography

### Display — Bricolage Grotesque
Use for large headlines, selected section headings, and short editorial statements.

### Body and interface — DM Sans
Use for paragraphs, navigation, forms, buttons, labels, and long-form articles.

### Optional technical accent — IBM Plex Mono
Use sparingly for process labels, project metadata, and technical annotations.

### Type rules
- Establish a clear hierarchy rather than using many font sizes.
- Use expressive headlines with comfortable line spacing.
- Keep paragraphs readable and relatively short.
- Use fluid sizing for large headings, with sensible minimum and maximum sizes.
- Verify the final fonts, licensing, loading behavior, and fallback stack before implementation.

## 4. Logo concept

Create a custom lowercase `veqo` wordmark.

**Preferred concept:** A clean, distinctive wordmark with a subtly expressive `q` tail suggesting curiosity, motion, or an idea continuing forward.

Required variants:
1. Primary wordmark for light backgrounds.
2. Reversed wordmark for aubergine backgrounds.
3. Single-color wordmark.
4. Standalone symbol for the favicon and compact placements.

The mark must remain recognizable at small sizes. Avoid generic AI symbols, robot imagery, and complicated multi-color lettering.

The wordmark is a design proposal until a final vector artwork is approved. Do not treat a generated logo image as production-ready vector artwork.

## 5. Illustration and shape language

### Illustration style
Use custom, editorial-style illustrations combining:
- Organic blobs, curves, and overlapping forms.
- Geometric shapes and deliberate angular contrasts.
- Small interface fragments, diagrams, and meaningful symbols.
- Limited, intentional use of texture and depth.

The imagery should represent ideas becoming tangible products, not simply people sitting beside laptops.

### Homepage hero illustration
Create a custom composition showing an idea progressing into a working digital product. Use layered shapes, a few miniature interface elements, and an expressive focal illustration.

Keep the headline and calls to action readable independently of the illustration.

### Asset rules
- Use consistent line weight, shadow behavior, and illustration proportions.
- Prefer original illustrations and purpose-created interface visuals.
- Clearly label conceptual project examples as illustrative.
- Do not invent customers, client logos, testimonials, performance metrics, or delivered results.
- Optimize assets for the web and provide appropriate alternatives when an image cannot load.

## 6. Website layout specification

### Global navigation
- Wordmark on the left.
- Primary navigation across the center or right.
- One clear contact or free-call action.
- Responsive mobile menu with accessible keyboard controls.
- Keep navigation visually quiet enough for the page content to lead.

### Homepage
1. Hero: “Ideas become something real.” — proposed headline.
2. Two distinct entry points: Student Projects and SaaS Development.
3. Brand values: Vision, Enrichment, Quality, Originality.
4. Service overview.
5. A clear step-by-step working process.
6. Selected work, with illustrative examples clearly identified.
7. Frequently asked questions.
8. Contact or free-call closing section.

### Student Projects
- Explain the guidance journey from idea selection through development, testing, documentation, and presentation preparation.
- Organize project examples by domain.
- Explain packages and deliverables only after their details are confirmed.
- Emphasize learning, originality, understanding, and honest academic work.

### SaaS Development
- Explain discovery, scope, design, development, integrations, deployment, monitoring, and maintenance.
- Address founders, SMEs, and agencies.
- Present capabilities in a clear progression instead of a wall of service cards.
- Keep AI/data services grounded in confirmed capabilities.

### About and Process
- Explain the brand values and working approach.
- Use a clear visual process sequence.
- Do not invent team biographies, company history, or credentials.

### Portfolio and Case Studies
- Use editorial project layouts with context, challenge, approach, and outcome.
- Separate real verified work from concept work.
- Use placeholders until real examples and permission to publish are available.

### Pricing
- Explain confirmed package differences and inclusions.
- Do not invent prices, guarantees, or timelines.
- Keep unresolved prices clearly marked as pending internal confirmation.

### Blog
- Establish a readable editorial layout with category labels, article summaries, and a strong long-form reading experience.
- Keep proposed articles distinct from published content.

### Contact
- Provide separate enquiry paths for students and business customers.
- Include relevant, concise fields and clear validation messages.
- Proposed location choices: Bengaluru, Chennai, Coimbatore, and Other.
- Confirm the enquiry destination and any attachment-upload requirements before implementation.

### Legal
Plan for Privacy, Terms, Refund, and Academic Integrity pages. Legal content requires confirmation and appropriate review before publication.

## 7. Responsive behavior

### Mobile
- Stack the hero text and illustration without shrinking either excessively.
- Keep both audience paths visible and easy to distinguish.
- Collapse navigation into an accessible menu.
- Avoid horizontal overflow and overly complex overlapping illustrations.
- Use comfortable touch targets and readable form labels.

### Tablet
- Use flexible two-column layouts where space permits.
- Reduce decorative elements before sacrificing text readability.
- Maintain clear separation between student and business content.

### Desktop
- Use an editorial grid with deliberate asymmetry.
- Allow illustrations to extend into surrounding whitespace without obscuring content.
- Keep text measure comfortable and navigation consistent.

All layouts must remain functional when text wraps, content grows, or browser zoom increases.

## 8. Motion and interaction system

**Motion character:** Smooth, immersive, purposeful.

| Interaction | Intended behavior |
|---|---|
| Initial page reveal | Gentle, brief staggered entrance |
| Scroll-based content | Subtle reveal when useful; content remains available without animation |
| Hero illustration | Restrained movement between visual layers |
| Buttons | Clear color change and subtle movement |
| Navigation | Smooth focus, hover, and menu transitions |
| Process sequence | Progress indication tied to the user's actual interaction or scroll position |
| Forms | Immediate, understandable feedback and persistent error descriptions |

### Motion constraints
- Respect `prefers-reduced-motion`.
- Never make content dependent on animation completing.
- Avoid continuous movement that competes with reading.
- Avoid flashing, excessive parallax, fake loading animations, and unnecessary custom cursors.
- Provide visible keyboard focus and equivalent non-hover states.
- Keep animation timing consistent and test on lower-powered mobile devices.

## 9. Accessibility and quality requirements

Target WCAG 2.2 AA as the accessibility benchmark.

- Semantic headings, landmarks, links, and buttons.
- Full keyboard navigation.
- Visible focus indicators.
- Sufficient text and component contrast.
- Descriptive labels and accessible form errors.
- Appropriate alternative text for meaningful images.
- Empty alternative text for purely decorative images.
- Reduced-motion support.
- Responsive layouts under zoom and larger text settings.
- No essential information communicated by color or motion alone.

## 10. Visual prototype plan

### Phase A — Design foundation
Deliver:
- Finalized color-token proposal.
- Typography scale and hierarchy.
- Logo concept and variant sheet.
- Illustration direction and shape library.
- Spacing, border, radius, and shadow principles.

**Review gate:** Approve the design foundation before expanding page designs.

### Phase B — Homepage prototype
Create a visual prototype covering:
- Desktop homepage.
- Mobile homepage.
- Navigation and mobile-menu states.
- Hero illustration and both audience paths.
- Service and process sections.
- Portfolio treatment.
- Closing call to action.

Include examples of hover, focus, active, and reduced-motion states.

**Review gate:** Approve the composition, hierarchy, illustration, and interactions.

### Phase C — Key page templates
Prototype representative pages for:
- Student Projects.
- SaaS Development.
- Portfolio/Case Study.
- Contact and enquiry forms.
- Blog article.

Use reusable design patterns while allowing each page to have its own editorial composition.

**Review gate:** Confirm that the system supports the entire site without becoming repetitive.

### Phase D — Responsive and accessibility review
Review desktop, tablet, and mobile layouts. Check text wrapping, touch targets, contrast, focus visibility, form errors, motion behavior, and loading failures.

### Phase E — Handoff
Prepare:
- Approved design tokens and type scale.
- Logo and illustration asset specifications.
- Page-layout references.
- Interaction and motion rules.
- Component-state checklist.
- Outstanding content and business decisions.
- Implementation acceptance criteria.

Only after the design is approved should website implementation begin.

## 11. Vercel deployment requirements

Vercel deployment is mandatory, but deployment is not part of the current design stage.

Before coding, the proposed architecture and deployment strategy must be confirmed. Next.js with TypeScript remains the provisional option, subject to final technical review.

The implementation stage must include:
- A Vercel-compatible application structure.
- A pinned supported Node.js version and committed package lockfile.
- Successful production build and type checks.
- Separate development, preview, and production environment configuration.
- Server-side handling of secrets.
- Working forms and verified enquiry delivery.
- Responsive browser and accessibility checks.
- A Vercel Preview deployment reviewed before Production deployment.

No production deployment should happen without explicit approval.

## 12. Decisions still required

Before implementation, confirm:
- Final logo artwork and fonts.
- Final hero illustration and its art direction.
- Actual service packages, pricing, and timelines.
- Real portfolio examples and publication permissions.
- Contact destination and booking provider.
- Team details and verified business claims.
- Final legal content.
- Whether attachment uploads are required.

Do not fill these gaps with fabricated content.

## Final acceptance criteria

The design is ready for implementation only when:

1. The visual identity and logo direction are approved.
2. The homepage and key page templates have been reviewed.
3. Desktop and mobile compositions are approved.
4. Motion, keyboard interaction, and reduced-motion behavior are specified.
5. Accessibility and asset requirements are documented.
6. Unconfirmed business content is identified rather than invented.
7. Vercel deployment and production-readiness requirements are documented.

**Current decision:** Proceed with design specification and visual prototype planning only. No application code, dependency installation, or deployment until the design approval gate is passed.
