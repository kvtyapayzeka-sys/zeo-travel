# ZEO Travel — Claude Project Instructions

## Project status
This is an EXISTING application. It is not a greenfield website.

Current technical foundation includes:
- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Framer Motion
- Radix UI primitives
- Prisma/PostgreSQL
- reservation, availability, payment and review domain models

Do not rebuild the application from scratch merely to redesign the frontend.

## Primary objective
Redesign ZEO Travel into a distinctive, commercially credible Antalya tours and activities platform that feels art-directed by a skilled human design team.

The product is not:
- a SaaS landing page,
- a generic travel template,
- a luxury hotel website,
- a villa-rental website,
- a dashboard.

The product is a tourism agency selling bookable experiences such as boat tours, paragliding, ATV safari, diving, horse riding and jeep safari.

## Legacy design warning
`ZEO-TRAVEL-UI-UX-DESIGN.md` documents the previous visual direction.

Treat that document as LEGACY REFERENCE ONLY for business/product requirements.
Do NOT treat its typography, gradients, component styling, card styling or visual language as binding design requirements.

When this `CLAUDE.md` conflicts with the old UI/UX document on visual matters, THIS FILE WINS.

## Protect existing product architecture
Preserve unless a redesign genuinely requires a small compatible refactor:
- existing public URLs and route semantics;
- tour/category data contracts;
- Prisma schema;
- API contracts;
- reservation and availability logic;
- payment/auth logic;
- SEO functionality;
- accessibility behavior;
- existing useful business logic.

Do not rename domain fields casually.

Never delete backend work simply because current pages still use mock data.

## Existing public information architecture
The redesign must remain compatible with the existing core public routes:
- `/`
- `/turlar`
- `/turlar/[slug]`
- `/hakkimizda`
- `/iletisim`

Additional design-lab routes may be created temporarily on an exploration branch, but must not replace production routes until a direction is selected.

## Design thesis
Recommended default direction:

**Mediterranean Adventure Editorial**

The brand should feel:
- local,
- energetic,
- credible,
- contemporary,
- sunlit,
- editorial,
- adventurous,
- easy to book.

It must avoid both cheap excursion-shop aesthetics and generic luxury-resort aesthetics.

## Visual principles
Photography should lead the experience.

Use:
- strong full-bleed or near-full-bleed destination/experience imagery;
- editorial scale contrast;
- intentional asymmetry;
- large but disciplined typography;
- strong alignment;
- practical booking information;
- occasional cinematic composition;
- restrained, purposeful motion;
- warmer Mediterranean neutrals combined with a deep sea/ink tone and one controlled energy accent;
- structured whitespace rather than endless white cards.

Do not force every element into a card.

## Anti-AI / anti-template rules
Do not default to:
- split-screen hero with copy left and rounded photo right;
- gradient blob backgrounds;
- floating blurred circles;
- floating rating cards;
- glassmorphism;
- Inter as the main brand expression;
- three-icon trust statistic rows;
- identical 3-column tour card sections;
- six identical square category cards;
- emojis as category identity;
- every section starting with centered title + paragraph;
- excessive rounded-2xl / rounded-3xl;
- white cards with large shadows;
- pill badges everywhere;
- decorative Lucide icons for every feature;
- generic bento grids;
- repeated hover-scale photo effects;
- generic “dream”, “journey”, “unforgettable” travel copy as the core brand idea;
- blue/purple tech gradients;
- SaaS-style CTA blocks;
- fake urgency;
- fake social proof;
- fake counters;
- invented awards, licenses, ratings or reviews.

If a pattern resembles an AI-generated Tailwind demo, rethink it.

## Typography
Do not preserve Inter merely because it exists today.

Select typography intentionally for Turkish readability and the chosen art direction.

A good direction may use:
- one expressive editorial/display family;
- one calm UI/body family.

Verify Turkish characters:
`ç ğ ı İ ö ş ü Ç Ğ Ö Ş Ü`

Do not use more than two primary type families without a strong reason.

## Color
Replace the current generic “blue trust + orange CTA” logic with a role-based brand palette.

The palette should evoke Antalya without becoming a postcard cliché.

Potential visual sources:
- deep Mediterranean water,
- limestone,
- sun-faded canvas,
- pine,
- terracotta roof/earth,
- evening ink.

Use one main accent for conversion actions.

Do not add gradients simply to make an empty section feel designed.

## Homepage goal
The homepage should answer:
1. What can I experience?
2. Where can I experience it?
3. Why should I book through ZEO Travel?
4. What will it cost / how long will it take?
5. How do I continue to booking?

Suggested content rhythm, not a rigid template:
- distinctive opening / hero;
- fast experience discovery;
- curated highlighted tours;
- experience/category discovery;
- destination discovery;
- factual trust/support information;
- editorial/local insight;
- decisive final conversion.

Vary section grammar deliberately.

## Hero
Do NOT reuse the current copy-left / image-right pattern.

The opening should be a signature brand moment.

Explore ideas such as:
- cinematic edge-to-edge experience photography with editorial typography;
- staggered photographic field;
- destination index integrated into the image;
- vertical editorial metadata;
- large photographic crop with a quiet integrated discovery control.

Search/CTA must belong to the composition rather than looking pasted on top.

## Tour cards
The current overlay-card-on-photo treatment is not the target.

Cards must make comparison easy while preserving strong photography.

Prioritize real:
- tour name;
- area/destination when available;
- duration;
- adult price;
- availability or schedule information when available;
- important inclusion/differentiator;
- verified rating only when real review data exists.

Avoid showing every metadata field as an icon.

Do not make every card mechanically identical if an editorial featured layout is more effective.

## Categories
Do not use emojis as the primary category language.

Categories should feel like curated experience types.

Possible treatments:
- editorial image rail;
- oversized typographic index;
- photographic strip with asymmetric crops;
- category names integrated into photography;
- controlled horizontal scroll on mobile.

## Tour listing page
The listing page is high-intent.

Prioritize:
- fast filtering;
- clear active filters;
- useful sorting;
- price/duration/destination scanability;
- compact but high-quality imagery;
- responsive behavior.

Avoid turning the filter area into a heavy dashboard sidebar.

Mobile filters must actually work.

Do not carry homepage theatrics into every result card.

## Tour detail page
Prioritize:
1. photographic proof;
2. title + location/category;
3. date/time/availability;
4. price;
5. primary booking action;
6. duration/capacity/suitability;
7. included/excluded;
8. itinerary or experience description;
9. pickup/transfer information;
10. factual trust/policies;
11. reviews only if sourced from real data.

On desktop, a restrained sticky booking module is acceptable.
On mobile, consider a compact sticky booking action that does not obscure content.

## Content authenticity
Current mock data may be used as development data only.

Never convert mock values into marketing claims.

Do not invent:
- “10,000+ happy guests”;
- “4.9 average”;
- review counts;
- “most trusted” claims;
- phone numbers;
- license numbers;
- partner logos;
- transfer promises;
- discount percentages;
- availability;
- prices;
- awards.

If a value is mock, keep it clearly within development/demo context.

## Image direction
Do not rely on random Unsplash images as a long-term brand system.

For development, placeholders are acceptable.
For visual direction, specify what production photography is needed.

Desired photography characteristics:
- authentic Antalya region;
- strong light and water;
- real activity context;
- human scale without clichéd influencer posing;
- architecture/topography when useful;
- consistent grading;
- useful negative space;
- believable crops.

## Motion
Use Framer Motion only when motion improves:
- reveal;
- hierarchy;
- image discovery;
- state transitions;
- filter/booking feedback.

Avoid:
- infinite floating decorative cards;
- animating every section;
- excessive parallax;
- scroll-jacking.

Respect reduced motion.

## Design exploration workflow
For a major redesign:

1. Inspect current routes/components/data before editing.
2. Use the `zeo-travel-redesign` skill.
3. If available, use `frontend-design`.
4. Do NOT immediately overwrite production homepage.
5. Produce three meaningfully different directions.
6. Implement them in an isolated design-lab or exploration branch when requested.
7. Review at desktop and mobile widths.
8. Use Playwright/browser screenshots if available.
9. Use `design-critic` after each direction.
10. Select a direction before migrating the full public site.

## Quality bar
A redesign is not complete because it is “clean.”

It must be:
- recognizable;
- usable;
- mobile-first where necessary;
- commercially effective;
- accessible;
- technically compatible;
- visibly non-template;
- consistent with an Antalya experiences brand.

If the page could become a SaaS website by replacing the photos and logo, the art direction is not strong enough.
