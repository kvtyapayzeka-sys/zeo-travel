# ZEO Travel — Redesign Exploration Prompt

We are redesigning an EXISTING application: ZEO Travel.

Read the repository before making design decisions.

Use the project `CLAUDE.md`.
Use the `zeo-travel-redesign` skill.
Use `frontend-design` if installed.
Use browser/Playwright tools if available.
Use `design-critic` after visual implementation.

## Critical context

This is NOT a greenfield project.

The current application already has:
- Next.js App Router;
- React + TypeScript;
- Tailwind CSS;
- Framer Motion;
- Radix UI primitives;
- Prisma/PostgreSQL;
- tour/category domain models;
- availability;
- reservations;
- payments;
- reviews;
- SEO/public routes.

The current visual design is NOT approved.

I want to replace the visual identity and public frontend experience while protecting useful architecture and business logic.

`ZEO-TRAVEL-UI-UX-DESIGN.md` is a legacy design document.
You may use it to understand product requirements, but DO NOT preserve its visual design rules just because they are documented.

## What is wrong with the current visual direction

Do not repeat these current patterns:
- generic text-left/image-right hero;
- rounded portrait hero image;
- gradient background;
- blur orbs;
- floating rating card;
- icon-based trust-stat row;
- generic 3-column featured cards;
- white overlay card over every tour image;
- 6 equal square category tiles;
- emojis as category design;
- generic gradient CTA section;
- Inter-led generic startup typography;
- excessive rounded corners and shadows;
- generic Tailwind demo appearance.

Do not merely recolor the existing UI.

## Brand/product position

ZEO Travel sells Antalya-region tours and activities such as:
- boat tours;
- paragliding;
- ATV safari;
- diving;
- horse riding;
- jeep safari;
- other bookable local experiences.

The brand should feel:
- local;
- credible;
- contemporary;
- visually memorable;
- energetic;
- easy to book;
- professional;
- Mediterranean.

It should NOT feel like:
- SaaS;
- fintech;
- an admin dashboard;
- a cheap excursion shop;
- a generic tour marketplace;
- a luxury hotel template.

## Phase 1 — Repository audit

Before coding, inspect the existing public pages, layout components, tour components, styles, data shapes and Prisma schema.

Produce a concise audit containing:
- what should be preserved;
- what is presentation-only and safe to redesign;
- problematic generic visual patterns;
- any UX issues that should be fixed during redesign;
- any placeholder/fake data that must not become production claims.

Do not modify production UI yet.

## Phase 2 — Three creative directions

Create THREE genuinely different design directions.

Do not produce three color variations of the same layout.

### Concept A: Mediterranean Adventure Editorial
A photography-first editorial travel identity.
Travel-magazine discipline with practical booking UX.
Warm mineral neutrals + deep Mediterranean tone + one energetic accent.
Intentional asymmetry.
Strong editorial typography.
Curated experience storytelling.

### Concept B: Riviera Modernist
Architectural, precise and contemporary.
Strong grid and typographic structure.
Stone/white surfaces, deep sea tone, restrained accent.
Sharper geometry.
Quiet confidence.
Minimal without becoming generic.

### Concept C: Kinetic Expedition
Higher energy and more youthful.
Bold photographic cropping.
Strong type scale contrast.
Dynamic category discovery.
Controlled motion.
Activity metadata treated like expedition/field labels.
Still premium in craft and highly usable.

For EACH concept define:
- design thesis;
- palette logic;
- typography strategy;
- header/navigation;
- hero composition;
- quick discovery/search interaction;
- featured-tour treatment;
- standard listing-card treatment;
- categories;
- destination/area discovery;
- trust/support section;
- final CTA;
- motion system;
- mobile composition;
- one signature visual element;
- risks/tradeoffs.

## Phase 3 — Build isolated concept previews

Do NOT overwrite the current `/` homepage yet.

Implement the three concepts in an isolated design-lab or exploration branch/location so they can be compared safely.

Use the same underlying tour data shape for all concepts.

The concepts must be complete enough to judge:
- header;
- hero;
- category discovery;
- featured tours;
- at least one trust/support treatment;
- final CTA;
- mobile behavior.

Do not build fake backend functionality.

Do not invent marketing statistics.

If the existing data contains mock ratings/review counts/phone numbers, treat them as development placeholders.

## Phase 4 — Visual QA

For every concept:
- render desktop around 1440px;
- render mobile around 390px;
- verify typography;
- verify image crops;
- verify navigation;
- verify CTA hierarchy;
- verify no horizontal overflow;
- verify focus/accessibility basics;
- verify reduced-motion behavior where relevant.

If Playwright is available, capture screenshots.

Then run the design critic.

Score each concept out of 100 for:
- originality;
- ZEO Travel brand fit;
- hierarchy;
- composition;
- typography;
- photography;
- tourism UX;
- mobile;
- motion/interaction;
- accessibility/implementation quality.

## Stopping rule

STOP after presenting:
1. repository audit;
2. three working visual directions;
3. desktop/mobile previews or screenshots if tooling permits;
4. critic scores;
5. your recommended direction.

DO NOT migrate the selected design into the production homepage until I explicitly choose one of the concepts.

The goal of this stage is to make a visual decision, not to finish the entire website.
