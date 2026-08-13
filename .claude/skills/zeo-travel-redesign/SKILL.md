---
name: zeo-travel-redesign
description: Project-specific redesign skill for the existing ZEO Travel Next.js tourism application. Use when redesigning the homepage, tour listing, tour detail, header/footer, visual system, category discovery, booking UI, or other public-facing frontend. Preserves current routes, backend/data architecture and business logic while replacing the legacy generic visual system.
---

# ZEO Travel Redesign

You are redesigning an existing Antalya tours and activities platform.

Do not treat this as a greenfield landing-page exercise.

## First: inspect before editing
Inspect relevant current files before proposing implementation.

At minimum, inspect when applicable:
- `app/(public)/page.tsx`
- `app/(public)/turlar/page.tsx`
- `app/(public)/turlar/[slug]`
- `components/home/*`
- `components/layout/*`
- `app/globals.css`
- `tailwind.config.*`
- `lib/mock-data.ts` or live data access layer
- relevant API/server modules
- `prisma/schema.prisma`

Identify which parts are:
- presentation-only;
- reusable product logic;
- data contracts;
- backend/domain logic.

Redesign presentation first. Preserve domain logic.

## Existing visual patterns to actively replace
The current implementation contains patterns that should not be carried forward automatically:
- generic two-column hero;
- gradient page backgrounds;
- rounded portrait hero card;
- floating blur circles;
- floating review/stat card;
- three trust metrics with Lucide icons;
- 3-column featured tour grid;
- overlay white card inside a rounded image;
- square category tile grid;
- emoji category icons;
- generic centered CTA gradient section;
- generic sticky white blurred navigation;
- prototype-like text logo and placeholder contact data.

Do not cosmetically restyle these patterns. Reconsider the composition.

## Recommended creative territory
Start with **Mediterranean Adventure Editorial** unless the user selects another direction.

Interpretation:
- travel magazine discipline + booking usability;
- energetic but not childish;
- premium in craft, not in “luxury” clichés;
- Antalya-specific;
- photographic;
- local;
- editorial;
- conversion-aware.

## Concept exploration
For early redesign exploration, create three genuinely different directions.

### Direction A — Mediterranean Adventure Editorial
Photography-first.
Large editorial typography.
Warm mineral neutral.
Deep Mediterranean ink/sea tone.
One energetic sun/terracotta accent.
Asymmetric feature layouts.
Curated, magazine-like experience hierarchy.

### Direction B — Riviera Modernist
More architectural and restrained.
Clear grid.
Strong Swiss/editorial typography.
White/stone surfaces.
Deep sea green/blue.
Sharp rules and controlled geometry.
Minimal but not sterile.

### Direction C — Kinetic Expedition
More energetic and youthful.
Bold cropping.
Strong typographic scale shifts.
Motion-led category discovery.
Dark/light contrast.
Useful activity metadata treated almost like expedition labels.
Never gaming/esports aesthetics.

Each direction must feel like a different creative agency pitched it.

## Homepage exploration requirements
Do not merely reskin existing components.

For each serious direction, solve:
- header/navigation;
- hero;
- experience discovery;
- featured tours;
- category system;
- destination/area discovery;
- trust/support;
- final conversion.

The homepage should not become a stack of identical rectangles.

## Tour-card redesign
Design at least two card roles:
- editorial featured experience;
- comparison/listing result.

Featured cards may be expressive.
Listing cards must prioritize comparison efficiency.

Avoid badge/icon overload.

## Booking interaction
Because the domain model supports dates, times, participant counts and availability, the visual system should be ready for:
- date selection;
- time slot selection;
- adult/child/infant counts where applicable;
- pickup information;
- price calculation;
- availability feedback.

Do not design a pretty card system that leaves no room for the actual reservation flow.

## Authenticity guardrail
Development mock data exists.

Never treat it as verified marketing evidence.

Remove or label placeholder:
- ratings;
- review counts;
- phone numbers;
- guest counts;
- “most trusted” claims.

## Output when asked for direction only
Do not code immediately.

Return for each direction:
- concept name;
- one-sentence thesis;
- visual mood;
- typography approach;
- palette logic;
- hero composition;
- navigation behavior;
- tour-card behavior;
- category behavior;
- motion language;
- mobile adaptation;
- signature element;
- risks/tradeoffs.

Recommend one direction and explain why it fits ZEO Travel.

## Output when asked to implement
Before editing:
- state what existing logic will remain untouched;
- identify files/components likely to change.

Then implement in coherent slices.

Avoid broad unrelated refactors.

## Visual verification
If browser/Playwright tooling is available:
- inspect 1440px desktop;
- inspect approximately 390px mobile;
- verify nav;
- verify major interactive states;
- check overflow;
- check image crops;
- check focus states;
- check reduced motion.

Then run the design critic.

## Final self-check
Ask:
- Does this look like a human-designed travel brand rather than generated Tailwind?
- Does it look specifically suitable for Antalya experiences?
- Can users quickly compare and book tours?
- Did we preserve backend/domain contracts?
- Did we accidentally invent trust signals?
- Is mobile intentionally composed?
- Is there one recognizable brand signature?

If not, iterate.
